import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [animateButton, setAnimateButton] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
      setAnimateButton(true);
      const timer = setTimeout(() => {
        setAnimateButton(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [headerRef]);

  return (
    <div className="min-h-screen bg-[#f4f8fc] flex flex-col">
      {/* Header com botão de Logout */}

      <div ref={headerRef} className="w-full h-[85px] bg-white flex justify-end items-center p-6">
        
        {/* O seu botão fica AQUI DENTRO do retângulo branco */}
        <button
          onClick={handleLogout}
          className={`
            w-[276px] h-[48px] text-white font-semibold px-6 py-2 flex items-center justify-center
            rounded-md hover:brightness-95
            transition-colors duration-150 ease-in-out
            ${animateButton 
              ? 'bg-[#2563eb] border-2 border-[#2596be]' 
              : 'bg-[#02274f] border-2 border-transparent'
            }
          `}
        >
          Logout
        </button>

      </div>
     
      {/* Card central */}
      <div className="flex-grow flex items-center  justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-[350px] h-[320px] text-center -mt-28 mx-auto relative z-10">
          <h2 className="text-gray-700 text-[12px] font-medium mb-2">
            Profile picture
          </h2>

          {/* Imagem do usuário */}
          <div className="flex justify-center mb-6">
            <img
              src={"https://avatars.githubusercontent.com/u/105256874?v=4"}
              alt="Profile"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-200"
            />
          </div>

          {/* Nome */}
          <div className="flex flex-col items-start mb-4">
            <label className="text-gray-600 text-[14px] font-semibold">Your <span className="font-bold">Name</span></label>
            <input
              type="text"
              value={user?.name || "Nome não disponível"}
              disabled
              className="w-full px-4 py-3 mt-2 text-[12px] rounded-lg bg-[#f1f1f1] text-gray-700 border border-gray-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col items-start">
            <label className="text-gray-600 text-[14px] font-semibold">Your <span className="font-bold">E-mail</span></label>
            <input
              type="text"
              value={user?.email || "E-mail não disponível"}
              disabled
              className="w-full px-4 py-3 mt-2 text-[12px] rounded-lg bg-[#f1f1f1] text-gray-700 border border-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
