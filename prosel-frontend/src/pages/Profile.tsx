import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <div className="flex justify-end">
          <button onClick={signOut} className="text-sm text-red-600">Logout</button>
        </div>

        <img src={user?.avatar || "/fallback-avatar.png"} alt="avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">{user?.name || user?.full_name || "Seu nome"}</h2>
        <p className="text-sm text-gray-600 mb-4">{user?.email}</p>

        {/* outros campos do perfil se existirem */}
      </div>
    </div>
  );
}
