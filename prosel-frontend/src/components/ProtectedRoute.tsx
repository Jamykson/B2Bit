import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface Props { children: JSX.Element; }

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useContext(AuthContext);

  
  if (loading) {
    return (
      
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  if (!user && !localStorage.getItem("@b2bit_token")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}