import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] flex flex-col">
      {/* Header com botão de Logout */}
      <div className="w-full flex justify-end p-6">
        <button
          onClick={handleLogout}
          className="bg-[#02274f] text-white font-semibold px-6 py-2 rounded-md hover:brightness-95 transition"
        >
          Logout
        </button>
      </div>

      {/* Card central */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-gray-700 text-lg font-medium mb-4">
            Profile picture
          </h2>

          {/* Imagem do usuário */}
          <div className="flex justify-center mb-6">
            <img
              src={user?.avatar || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
          </div>

          {/* Nome */}
          <div className="flex flex-col items-start mb-4">
            <label className="text-gray-600 font-semibold">Your <span className="font-bold">Name</span></label>
            <input
              type="text"
              value={user?.name || "Nome não disponível"}
              disabled
              className="w-full px-4 py-3 mt-2 rounded-lg bg-[#f1f1f1] text-gray-700 border border-gray-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col items-start">
            <label className="text-gray-600 font-semibold">Your <span className="font-bold">E-mail</span></label>
            <input
              type="text"
              value={user?.email || "E-mail não disponível"}
              disabled
              className="w-full px-4 py-3 mt-2 rounded-lg bg-[#f1f1f1] text-gray-700 border border-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
