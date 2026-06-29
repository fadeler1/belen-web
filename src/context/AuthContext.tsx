"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AUTH_EVENTS, getAuthService } from "@/lib/auth";
import type { AuthUser } from "@/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authService = useMemo(() => getAuthService(), []);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  const syncUser = useCallback(() => {
    setUser(authService.getCurrentUser());
  }, [authService]);

  useEffect(() => {
    syncUser();
    setIsReady(true);

    window.addEventListener(AUTH_EVENTS.changed, syncUser);
    return () => window.removeEventListener(AUTH_EVENTS.changed, syncUser);
  }, [syncUser]);

  const logout = useCallback(() => {
    authService.logout();
  }, [authService]);

  const value = useMemo(
    () => ({ user, isReady, logout }),
    [user, isReady, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
