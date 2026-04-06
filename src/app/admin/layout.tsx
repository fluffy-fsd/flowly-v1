"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { LayoutDashboard, Users, FolderKanban, MessageSquare, Globe, LogOut, Menu, X, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/clients", label: "CRM Prospects", icon: UserCircle },
  { href: "/admin/users", label: "Comptes clients", icon: Users },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const { profile, signOut } = useAuth();
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full">
      <div className="h-14 px-5 flex items-center justify-between border-b border-white/[0.065] shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>F<span className="text-indigo-400">Studios</span></span>
          <span className="text-white/20 text-xs bg-white/[0.05] border border-white/[0.07] px-1.5 py-0.5 rounded-md">Admin</span>
        </Link>
        {onClose && <button onClick={onClose} className="text-white/40 hover:text-white p-1 transition-colors"><X className="w-5 h-5" /></button>}
      </div>
      <div className="px-4 py-3 border-b border-white/[0.065] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-500/25 border border-indigo-500/35 flex items-center justify-center text-indigo-200 text-xs font-bold shrink-0">{profile?.avatarInitials ?? "A"}</div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{profile?.displayName ?? "Admin"}</p>
            <p className="text-indigo-400/70 text-xs">Administrateur</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={onClose}
              className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20" : "text-white/45 hover:text-white/75 hover:bg-white/[0.05]")}>
              <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />{label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/[0.065] space-y-1 shrink-0">
        <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/35 hover:text-white/60 hover:bg-white/[0.04] transition-all">
          <Globe className="w-4 h-4 shrink-0" strokeWidth={1.75} />Voir le site
        </Link>
        <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/35 hover:text-red-400 hover:bg-red-500/[0.06] transition-all">
          <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.75} />Déconnexion
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
    if (!loading && user && profile && profile.role !== "admin") router.push("/dashboard");
  }, [user, profile, loading, router]);

  if (loading) return (
    <div className="min-h-screen bg-[#07090f] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
  if (!user || (profile && profile.role !== "admin")) return null;

  return (
    <div className="min-h-screen bg-[#07090f] flex" style={{ fontFamily: "system-ui, sans-serif" }}>
      <aside className="w-56 shrink-0 bg-[#0a0d17] border-r border-white/[0.065] hidden md:flex flex-col fixed top-0 bottom-0 left-0 z-30">
        <SidebarContent />
      </aside>
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed top-0 left-0 bottom-0 w-64 z-50 bg-[#0a0d17] border-r border-white/[0.065] flex flex-col md:hidden">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </aside>
        </>
      )}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        <div className="md:hidden h-14 px-4 flex items-center justify-between border-b border-white/[0.065] bg-[#0a0d17] sticky top-0 z-20">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"><Menu className="w-5 h-5" /></button>
          <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-syne)" }}>F<span className="text-indigo-400">Studios</span></span>
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-bold">{profile?.avatarInitials ?? "A"}</div>
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
