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
    // aqui simulamos o usuário sem chamar API
    const fakeUser = {
      name: "Jamykson Freitas",
      email,
      avatar: "https://i.pravatar.cc/150?img=3", // avatar aleatório
    };

    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.replace("/login"); // opcional
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
