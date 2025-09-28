import React, { createContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  avatar: string;
} | null;

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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
  // 1. Defina aqui as credenciais corretas
  const correctEmail = "test@test.com";
  const correctPassword = "123456";

  // Simula um pequeno atraso, como se fosse uma chamada de API real
  await new Promise(resolve => setTimeout(resolve, 500));

  // 2. Verifica se o e-mail e a senha correspondem
  if (email === correctEmail && password === correctPassword) {
    // 3. Se estiverem corretos, cria o usuário e faz o login
    const fakeUser = {
      name: "Jamykson Freitas",
      email: correctEmail,
      avatar: "https://avatars.githubusercontent.com/u/105256874?v=4",
    };

    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  } else {
    // 4. Se estiverem errados, lança um erro com uma mensagem
    throw new Error("E-mail ou senha inválidos.");
  }
};

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    // A linha de window.location.replace foi removida daqui
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
