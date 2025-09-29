import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

const api = axios.create({
  baseURL: "/api", 
});

type User = {
  name: string;
  email: string;
  avatar: { url: string; };
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromStorage() {
      const token = localStorage.getItem("@b2bit_token");
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get('/auth/profile/');
          setUser(response.data);
        } catch (error) {
          console.error("Token inválido, deslogando.", error);
          signOut();
        }
      }
      setLoading(false);
    }
    loadUserFromStorage();
  }, []);


  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login/', 
        { email, password },
        { 
          headers: {
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json'
          }
        }
      );

      const { user, tokens } = response.data;

      
      if (tokens && tokens.access) {
        const accessToken = tokens.access;
        
        localStorage.setItem("@b2bit_token", accessToken);        
        
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        setUser(user);
      } else {
        
        throw new Error("Token de acesso não encontrado na resposta da API.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const detailError = error.response.data.detail || "E-mail ou senha inválidos.";
        throw new Error(detailError);
      }
      console.error("Erro de rede. Verifique a conexão e o proxy.", error);
      throw new Error("Não foi possível conectar ao servidor.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@b2bit_token");
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};