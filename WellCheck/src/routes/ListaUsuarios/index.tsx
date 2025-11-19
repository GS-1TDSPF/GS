import React, { useEffect, useState, type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Lista de Usuários
 * Requisitos: React + TypeScript + TailwindCSS + fetch nativo
 *
 * Ajuste API_BASE para a URL da sua API (deploy na Vercel/Heroku/etc).
 */

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

type Usuario = {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
  cargo: string;
};

type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: T };

export default function UsuariosList(): JSX.Element {
  const [usuariosState, setUsuariosState] = useState<FetchState<Usuario[]>>({
    status: "idle",
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadUsuarios() {
    setUsuariosState({ status: "loading" });
    try {
      const res = await fetch(`${API_BASE}/usuarios`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${res.statusText} - ${text}`);
      }
      const data: Usuario[] = await res.json();
      setUsuariosState({ status: "success", data });
    } catch (err: any) {
      setUsuariosState({ status: "error", error: err.message || "Erro" });
    }
  }

  async function handleDelete(id: number) {
    const ok = confirm("Deseja realmente excluir este usuário?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/usuarios/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`${res.status} ${res.statusText} - ${txt}`);
      }

      loadUsuarios();
      alert("Usuário excluído com sucesso.");
    } catch (err: any) {
      alert("Erro ao excluir: " + (err.message || err));
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Usuários
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Gerencie os usuários do sistema — listar, criar, editar e excluir.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="hidden sm:inline-block px-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm"
            >
              Voltar
            </button>

            <Link
              to="/usuarios/novo"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm shadow"
            >
              + Novo usuário
            </Link>
          </div>
        </header>

        <main className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto">
          {/* Loading / Error */}
          {usuariosState.status === "loading" && (
            <div className="p-6 text-center">Carregando usuários...</div>
          )}

          {usuariosState.status === "error" && (
            <div className="p-6 text-red-600 dark:text-red-400">
              Erro ao carregar: {usuariosState.error}
              <div className="mt-3">
                <button
                  onClick={loadUsuarios}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          )}

          {usuariosState.status === "success" && (
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                    Cargo
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {usuariosState.data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}

                {usuariosState.data.map((u) => (
                  <tr key={u.id_usuario} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                      {u.id_usuario}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {u.nome}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 break-all">
                      {u.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                      {u.cargo}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="inline-flex gap-2">
                        <Link
                          to={`/usuarios/${u.id_usuario}`}
                          className="px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Ver / Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(u.id_usuario)}
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>

        <footer className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          API: <span className="font-mono">{API_BASE}/usuarios</span>
        </footer>
      </div>
    </div>
  );
}
