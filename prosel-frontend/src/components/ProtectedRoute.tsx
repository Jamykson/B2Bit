import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface Props { children: JSX.Element; }

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="p-6">Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
