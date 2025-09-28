import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/b2bit-logo.png";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/profile");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Erro ao autenticar"
      );
    } finally {
      setLoading(false);
    }
  };


 
 return (
  // Fundo da página branco
  <div className="flex items-center justify-center min-h-screen bg-white p-8">
    
    {/* Card verde com tamanho reduzido */}
  <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_10px_30px_5px_rgba(0,0,0,0.3)] py-8 px-4 sm:py-12 sm:px-6">

      {/* Logo */}
      <div className="flex justify-center mb-8 mt-50">
        <img src={logo} alt="b2bit logo" className="w-70 h-auto" />
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}

      {/* --- Seção de Email --- */}
      <div className="flex flex-col items-start">
        {/* MUDANÇA: Removido w-72 daqui */}
        <label className="block text-[18px] font-semibold text-[#333333] mb-2">
          E-mail
        </label>
        <input
          type="email"
          placeholder="@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-4 text-[15px] text-sm bg-[#f1f1f1] rounded-lg placeholder:text-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-b2bit-blue"
          required
        />
      </div>

      {/* --- Seção de Senha --- */}
      <div className="flex flex-col items-start mt-4">
        <label className="block text-[18px] font-semibold text-[#333333] mb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-4 text-[15px] text-sm bg-[#f1f1f1] rounded-lg placeholder:text-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-b2bit-blue"
          required
        />
      </div>

      {/* --- Seção do Botão --- */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={loading}
          // MUDANÇA: de w-72 para w-full para consistência
          className="w-full h-14 bg-[#02274f] flex items-center justify-center bg-blue-600 text-[18px] text-white rounded-lg font-semibold hover:brightness-95 transition disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Sign In"}
        </button>
      </div>
    </form>
    </div>
  </div>
);
}