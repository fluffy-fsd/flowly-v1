"use client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { getProjectsByClient, getMessages, sendMessage, markMessagesRead } from "@/lib/db";
import type { Project, Message } from "@/types/user";
import { Send, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function DashboardMessagesPage() {
  const { user, profile } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    getProjectsByClient(user.uid).then(p => {
      setProjects(p);
      if (p.length > 0) setSelectedProject(p[0]);
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    if (!selectedProject || !user) return;
    getMessages(selectedProject.id).then(m => {
      setMessages(m);
      markMessagesRead(selectedProject.id, user.uid);
    });
  }, [selectedProject, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !selectedProject || !user || !profile) return;
    setSending(true);
    await sendMessage({
      projectId: selectedProject.id,
      senderUid: user.uid,
      senderName: profile.displayName,
      senderRole: "client",
      content: text.trim(),
      read: false,
    });
    setText("");
    const updated = await getMessages(selectedProject.id);
    setMessages(updated);
    setSending(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  if (loading) return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/[0.04] rounded-2xl animate-pulse" />)}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
      <div className="mb-5">
        <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Messages</h1>
        <p className="text-white/35 text-sm mt-1">Échangez directement avec l&apos;équipe FStudios.</p>
      </div>

      {projects.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-10 h-10 text-white/15 mx-auto mb-3" />
            <p className="text-white/35 text-sm">Aucun projet actif pour l&apos;instant.</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden min-h-0" style={{ height: "calc(100vh - 220px)" }}>
          {/* Project tabs */}
          {projects.length > 1 && (
            <div className="flex gap-1 p-2 border-b border-white/[0.065] overflow-x-auto shrink-0">
              {projects.map(p => (
                <button key={p.id} onClick={() => setSelectedProject(p)}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                    selectedProject?.id === p.id ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/25" : "text-white/45 hover:text-white/70 hover:bg-white/[0.05]")}>
                  {p.title}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center pt-8">
                <p className="text-white/25 text-sm">Aucun message pour l&apos;instant.</p>
                <p className="text-white/15 text-xs mt-1">Envoyez votre premier message ci-dessous.</p>
              </div>
            ) : (
              messages.map(msg => {
                const isMe = msg.senderUid === user?.uid;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={cn("max-w-[80%] sm:max-w-md rounded-2xl px-4 py-2.5",
                      isMe ? "bg-indigo-500 text-white rounded-tr-sm" : "bg-white/[0.06] text-white/80 rounded-tl-sm")}>
                      {!isMe && <p className="text-indigo-400 text-xs font-semibold mb-1">{msg.senderName}</p>}
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className={cn("text-xs mt-1", isMe ? "text-white/50" : "text-white/25")}>
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : ""}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/[0.065] shrink-0">
            <div className="flex gap-2">
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Écrivez votre message... (Entrée pour envoyer)"
                rows={2}
                className="flex-1 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
              />
              <button onClick={handleSend} disabled={!text.trim() || sending}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-indigo-500 hover:bg-indigo-400 disabled:bg-white/[0.06] disabled:text-white/20 rounded-xl flex items-center justify-center transition-all shrink-0 self-end">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
