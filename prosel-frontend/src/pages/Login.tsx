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
  <div className="flex items-center justify-center min-h-screen bg-white">
    
    {/* Card verde com tamanho reduzido */}
    <div className="w-full max-w-[425px] h-[465px] bg-[#90EE90] rounded-[16px] pt-40 pb-8 px-6 shadow-lg">

      {/* Logo */}
      <div className="flex justify-center mb-8 mt-500">
        <img src={logo} alt="b2bit logo" className="w-40 h-auto" />
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        {/* --- Seção de Email --- */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-semibold text-white mb-2 w-72">
            E-mail
          </label>
          <input
            type="email"
            placeholder="@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-72 px-4 py-3 text-sm bg-[#f1f1f1] rounded-lg placeholder:text-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-b2bit-blue"
            required
          />
        </div>

        {/* --- Seção de Senha --- */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-semibold text-white mb-2 w-72">
            Password
          </label>
          <input
            type="password"
            placeholder="************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-72 px-4 py-3 text-sm bg-[#f1f1f1] rounded-lg placeholder:text-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-b2bit-blue"
            required
          />
        </div>

        {/* --- Seção do Botão --- */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-72 h-12 flex items-center justify-center bg-b2bit-blue text-white rounded-lg font-semibold hover:brightness-95 transition"
          >
            {loading ? "Entrando..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  </div>
);


  
}
