import React, { useState, type FormEvent,  } from "react";
import { useNavigate } from "react-router-dom";




interface LoginRequest {
  email: string;
  senha: string;
}


type BasicUser = { id: number; nome: string };
type AuthMeta = { token: string; expiresAt: string };
export type AuthenticatedUser = BasicUser & AuthMeta; 


type LoginResponse = 
  | { success: true; user: AuthenticatedUser }
  | { success: false; message: string };


type ErrorState = string | null;



const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>(null);

  const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);


    if (!email || !senha) {
      setError("Preencha email e senha.");
      return;
    }

    const payload: LoginRequest = { email, senha };

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {

        const err = await res.json().catch(() => null);
        const message = err?.message ?? `Erro ${res.status}`;
        setError(message);
        setLoading(false);
        return;
      }

      const data: LoginResponse = await res.json();

      if (data.success) {
   
        const user = data.user;
        localStorage.setItem("token", user.token);
        localStorage.setItem("userName", user.nome);

        navigate(`/dashboard/${user.id}`);
      } else {
        setError(data.message || "Credenciais inválidas");
      }
    } catch (err) {
      console.error("Erro ao conectar com API:", err);
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-400 p-2"
              placeholder="seu@email.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-400 p-2"
              placeholder="••••••••"
              required
            />
          </label>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="text-center mt-2 text-sm">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="underline"
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
  );
};

export default Login;
