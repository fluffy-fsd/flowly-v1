"use client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { getAllProjects, getMessages, sendMessage, markMessagesRead } from "@/lib/db";
import type { Project, Message } from "@/types/user";
import { Send, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminMessagesPage() {
  const { user, profile } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    getAllProjects().then(p => {
      setProjects(p);
      if (p.length > 0) setSelected(p[0]);
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    if (!selected || !user) return;
    getMessages(selected.id).then(m => {
      setMessages(m);
      markMessagesRead(selected.id, user.uid);
    });
  }, [selected, user]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !selected || !user || !profile) return;
    setSending(true);
    await sendMessage({
      projectId: selected.id,
      senderUid: user.uid,
      senderName: "FStudios",
      senderRole: "admin",
      content: text.trim(),
      read: false,
    });
    setText("");
    setMessages(await getMessages(selected.id));
    setSending(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4">
      <div>
        <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Messages</h1>
        <p className="text-white/35 text-sm mt-1">Communication avec vos clients.</p>
      </div>

      {loading ? <div className="h-64 bg-white/[0.04] rounded-2xl animate-pulse" />
        : projects.length === 0 ? (
          <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-10 text-center">
            <MessageSquare className="w-8 h-8 text-white/15 mx-auto mb-2" />
            <p className="text-white/30 text-sm">Aucun projet actif.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4" style={{ height: "calc(100vh - 200px)" }}>
            {/* Project list */}
            <div className="lg:w-64 shrink-0 space-y-1.5 overflow-y-auto">
              {projects.map(p => (
                <button key={p.id} onClick={() => setSelected(p)}
                  className={cn("w-full text-left p-3.5 rounded-xl border transition-all",
                    selected?.id === p.id ? "bg-indigo-500/15 border-indigo-500/30 text-white" : "bg-white/[0.025] border-white/[0.065] text-white/55 hover:border-white/12")}>
                  <p className="text-sm font-semibold truncate">{p.title}</p>
                  <p className="text-xs text-white/30 mt-0.5 truncate">{p.clientName}</p>
                </button>
              ))}
            </div>

            {/* Chat */}
            {selected && (
              <div className="flex-1 flex flex-col bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden min-h-0">
                <div className="px-4 py-3 border-b border-white/[0.065] shrink-0">
                  <p className="text-white font-semibold text-sm">{selected.title}</p>
                  <p className="text-white/30 text-xs">{selected.clientName}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center pt-8"><p className="text-white/22 text-sm">Aucun message.</p></div>
                  ) : messages.map(msg => {
                    const isAdmin = msg.senderRole === "admin";
                    return (
                      <div key={msg.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                        <div className={cn("max-w-[80%] rounded-2xl px-4 py-2.5",
                          isAdmin ? "bg-indigo-500 text-white rounded-tr-sm" : "bg-white/[0.06] text-white/80 rounded-tl-sm")}>
                          {!isAdmin && <p className="text-indigo-400 text-xs font-semibold mb-1">{msg.senderName}</p>}
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                          <p className={cn("text-xs mt-1", isAdmin ? "text-white/50" : "text-white/25")}>
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : ""}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>

                <div className="p-3 border-t border-white/[0.065] shrink-0">
                  <div className="flex gap-2">
                    <textarea value={text} onChange={e => setText(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                      placeholder="Répondre... (Entrée pour envoyer)" rows={2}
                      className="flex-1 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all resize-none" />
                    <button onClick={handleSend} disabled={!text.trim() || sending}
                      className="w-10 h-10 bg-indigo-500 hover:bg-indigo-400 disabled:bg-white/[0.06] disabled:text-white/20 rounded-xl flex items-center justify-center transition-all shrink-0 self-end">
                      {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
