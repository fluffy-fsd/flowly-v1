"use client";
import {
  createContext, useContext, useEffect, useState, type ReactNode,
} from "react";
import {
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut as fbSignOut,
  updateProfile, type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserProfile, UserRole } from "@/types/user";

const ADMIN_EMAIL = "doriangosselin6@gmail.com";

interface AuthCtx {
  user: User | null;
  profile: UserProfile | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, company: string) => Promise<void>;
  signOut: () => Promise<void>;
  authError: string | null;
  clearError: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const role: UserRole | null = profile?.role ?? null;

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        } else {
          // Auto-create profile for admin
          const isAdmin = u.email === ADMIN_EMAIL;
          const p: UserProfile = {
            uid: u.uid,
            email: u.email ?? "",
            displayName: u.displayName ?? u.email ?? "",
            company: isAdmin ? "FStudios" : "",
            phone: "",
            country: "FR",
            role: isAdmin ? "admin" : "client",
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            avatarInitials: (u.displayName ?? u.email ?? "?").slice(0, 2).toUpperCase(),
          };
          await setDoc(ref, p);
          setProfile(p);
        }
        // Update lastLoginAt
        await setDoc(ref, { lastLoginAt: new Date().toISOString() }, { merge: true });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  const firebaseErrorMsg = (code: string): string => {
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found": return "Email ou mot de passe incorrect.";
      case "auth/email-already-in-use": return "Cet email est déjà utilisé.";
      case "auth/weak-password": return "Mot de passe trop faible (min. 6 caractères).";
      case "auth/invalid-email": return "Email invalide.";
      case "auth/too-many-requests": return "Trop de tentatives. Réessayez dans quelques minutes.";
      default: return "Erreur de connexion. Réessayez.";
    }
  };

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: unknown) {
      const msg = firebaseErrorMsg((e as { code?: string })?.code ?? "");
      setAuthError(msg);
      throw e;
    }
  };

  const signUp = async (email: string, password: string, name: string, company: string) => {
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
      const p: UserProfile = {
        uid: cred.user.uid,
        email, displayName: name, company, phone: "",
        country: "FR", role: "client",
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        avatarInitials: initials,
      };
      await setDoc(doc(db, "users", cred.user.uid), { ...p, createdAt: serverTimestamp() });
    } catch (e: unknown) {
      const msg = firebaseErrorMsg((e as { code?: string })?.code ?? "");
      setAuthError(msg);
      throw e;
    }
  };

  const signOut = async () => {
    await fbSignOut(auth);
    setProfile(null);
  };

  return (
    <Ctx.Provider value={{ user, profile, role, loading, signIn, signUp, signOut, authError, clearError: () => setAuthError(null) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};
