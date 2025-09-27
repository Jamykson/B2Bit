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
      setError(err?.response?.data?.message || err?.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6f7f8]">
      <div className="w-full max-w-[420px] bg-white rounded-xl-2 p-10 shadow-b2bit-card">
        {/* logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="b2bit logo" className="w-48 h-auto" />
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">E-mail</label>
            <input
              type="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-[#f1f1f1] rounded-lg placeholder:text-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-b2bit-blue"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
            <input
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-[#f1f1f1] rounded-lg placeholder:text-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-b2bit-blue"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 flex items-center justify-center bg-b2bit-blue text-white rounded-lg font-semibold hover:brightness-95 transition"
          >
            {loading ? "Entrando..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
