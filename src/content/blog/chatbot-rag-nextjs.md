---
title: "Intégrer un chatbot RAG dans votre application Next.js"
excerpt: "Pinecone, OpenAI Embeddings, streaming responses — construire un assistant IA contextuel qui répond sur VOS données."
category: "Intelligence Artificielle"
tags: ["IA", "RAG", "OpenAI", "Pinecone", "Next.js"]
publishedAt: "2025-04-01T09:00:00Z"
featured: false
coverGradient: "from-emerald-600/25 to-teal-600/15"
authorName: "Dorian Gosselin"
authorRole: "Founder @ FStudios"
---

RAG — Retrieval Augmented Generation — c'est la technique qui permet à un LLM de répondre sur **vos données spécifiques** plutôt que sur son training général. Voici comment l'implémenter proprement en production.

## L'architecture RAG en 4 étapes

1. **Ingestion** : vos documents sont découpés en chunks et transformés en vecteurs (embeddings)
2. **Stockage** : les vecteurs sont stockés dans une base vectorielle (Pinecone, Supabase pgvector)
3. **Retrieval** : à chaque question, on cherche les chunks les plus proches sémantiquement
4. **Generation** : on envoie les chunks retrouvés comme contexte au LLM

## Setup Pinecone + OpenAI

```typescript
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const index = pinecone.index("my-knowledge-base");

// Créer l'embedding d'une question
export async function embedQuery(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

// Chercher les documents pertinents
export async function searchSimilar(query: string, topK = 5) {
  const vector = await embedQuery(query);
  const results = await index.query({
    vector,
    topK,
    includeMetadata: true,
  });
  return results.matches;
}
```

## La route API avec streaming

La clé d'une bonne UX chatbot : le **streaming**. L'utilisateur voit la réponse apparaître token par token, pas un long silence suivi d'un bloc de texte.

```typescript
// app/api/chat/route.ts
import OpenAI from "openai";
import { searchSimilar } from "@/lib/rag";

export async function POST(req: Request) {
  const { message, history } = await req.json();

  // 1. Retrouver le contexte pertinent
  const matches = await searchSimilar(message);
  const context = matches
    .map((m) => m.metadata?.text)
    .filter(Boolean)
    .join("\n\n");

  // 2. Construire le prompt avec contexte
  const systemPrompt = `Tu es un assistant expert. Réponds uniquement sur la base du contexte fourni.
  
CONTEXTE :
${context}

Si la réponse n'est pas dans le contexte, dis-le clairement.`;

  // 3. Streamer la réponse
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message },
    ],
    stream: true,
  });

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
```

## Ingestion des documents

```typescript
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function ingestDocument(text: string, metadata: object) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.createDocuments([text]);

  const embeddings = await Promise.all(
    chunks.map((chunk) => embedQuery(chunk.pageContent))
  );

  await index.upsert(
    embeddings.map((vector, i) => ({
      id: `doc-${Date.now()}-${i}`,
      values: vector,
      metadata: { ...metadata, text: chunks[i].pageContent },
    }))
  );
}
```

## Ce qui fait la différence en prod

**Chunking stratégique** : le `chunkOverlap` est crucial. Sans overlap, vous coupez le contexte en plein milieu d'une phrase.

**Reranking** : après le retrieval vectoriel, un second passage avec un modèle de reranking (Cohere Rerank) améliore significativement la qualité.

**Guardrails** : toujours logger les questions sans réponse dans le contexte — c'est votre signal pour améliorer la base de connaissance.

---

Vous avez besoin d'un chatbot IA sur vos données ? [Contactez-moi pour un devis](/devis).
