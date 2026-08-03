"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;

  authRequiredOpen: boolean;
  openAuthRequired: () => void;
  closeAuthRequired: () => void;

  requireAuth: (action: () => void) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,

  authRequiredOpen: false,
  openAuthRequired: () => {},
  closeAuthRequired: () => {},

  requireAuth: () => {},
});

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [authRequiredOpen, setAuthRequiredOpen] = useState(false);

  useEffect(() => {
    async function initialize() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthRequired = useCallback(() => {
    setAuthRequiredOpen(true);
  }, []);

  const closeAuthRequired = useCallback(() => {
    setAuthRequiredOpen(false);
  }, []);

  const requireAuth = useCallback(
    (action: () => void) => {
      if (loading) return;

      if (!user) {
        openAuthRequired();
        return;
      }

      action();
    },
    [user, loading, openAuthRequired]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,

        authRequiredOpen,
        openAuthRequired,
        closeAuthRequired,

        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}