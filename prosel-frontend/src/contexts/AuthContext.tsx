import React, { createContext, useEffect, useState } from "react";
import api from "../services/api";

type User = any | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/profile/");
        setUser(res.data);
      } catch {
        localStorage.removeItem("access_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await api.post("/auth/login/", { email, password });
    // robustez para diferentes nomes de campo do token
    const data = res.data || {};
    const token = data.access || data.access_token || data.token || data?.accessToken;
    if (!token) throw new Error("Resposta de login sem token.");
    localStorage.setItem("access_token", token);
    // garante que axios já use o token
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    // buscar perfil
    const profileRes = await api.get("/auth/profile/");
    setUser(profileRes.data);
  };

  const signOut = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    delete api.defaults.headers.common.Authorization;
    // opcional: redirecionar
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
