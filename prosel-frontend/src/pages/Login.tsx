import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/b2bit-logo.png";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [animateButton, setAnimateButton] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setAnimateButton(true);
      // MUDANÇA AQUI de 700 para 300
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
}, [formRef]);

  // Dentro de Login.tsx

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(""); // O erro é limpo AQUI
    
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/profile");
    } catch (err: any) {
      // E um novo erro é definido aqui, se a tentativa falhar
      setError(err.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_10px_30px_5px_rgba(0,0,0,0.3)] py-8 px-4 sm:py-12 sm:px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="b2bit logo" className="w-70 h-auto" />
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <form ref={formRef} onSubmit={handleLogin} className="space-y-6"></form>
          {/* E-mail */}
          <div className="flex flex-col items-start">
            <label className="block text-[18px] font-semibold text-[#333333] mb-2">
              E-mail
            </label>
            <input
              type="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 text-[15px] bg-[#f1f1f1] rounded-lg placeholder:text-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-b2bit-blue"
              required
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col items-start mt-4">
            <label className="block text-[18px] font-semibold text-[#333333] mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 text-[15px] bg-[#f1f1f1] rounded-lg placeholder:text-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-b2bit-blue"
              required
            />
          </div>

          {/* Botão */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full h-14 flex items-center justify-center text-[18px] text-white rounded-lg font-semibold 
                hover:brightness-95 transition disabled:opacity-60
                transition-colors duration-150 ease-in-out
                ${animateButton ? 'bg-[#2563eb] border-2 border-[#2596be]' 
                                : 'bg-[#02274f] border-2 border-transparent'}
              `}
            >
              {loading ? "Entrando..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
