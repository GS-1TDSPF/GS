import { useEffect, useState } from "react";

interface Alerta {
  id_alerta?: number;
  titulo: string;
  descricao: string;
  nivel: string;
}

export default function AlertasPage() {
  const API_URL = "http://localhost:8080/alertas";

  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [form, setForm] = useState<Alerta>({
    titulo: "",
    descricao: "",
    nivel: ""
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // ================================
  // CARREGAR TODOS OS ALERTAS
  // ================================
  const carregarAlertas = async () => {
    try {
      const req = await fetch(API_URL);
      const data = await req.json();
      setAlertas(data);
    } catch (error) {
      console.error("Erro ao carregar alertas:", error);
    }
  };

  useEffect(() => {
    carregarAlertas();
  }, []);

  // ================================
  // MANIPULAR CAMPOS DO FORM
  // ================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================================
  // CRIAR ALERTA
  // ================================
  const criarAlerta = async () => {
    setLoading(true);
    try {
      const req = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!req.ok) throw new Error("Erro ao criar alerta");

      setForm({ titulo: "", descricao: "", nivel: "" });
      carregarAlertas();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // ================================
  // CARREGAR ALERTA NO FORM (EDITAR)
  // ================================
  const editarAlerta = (alerta: Alerta) => {
    setEditingId(alerta.id_alerta!);
    setForm(alerta);
  };

  // ================================
  // ATUALIZAR ALERTA
  // ================================
  const atualizarAlerta = async () => {
    if (!editingId) return;

    setLoading(true);

    try {
      const req = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!req.ok) throw new Error("Erro ao atualizar alerta");

      setForm({ titulo: "", descricao: "", nivel: "" });
      setEditingId(null);
      carregarAlertas();
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // ================================
  // DELETAR ALERTA
  // ================================
  const deletarAlerta = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      carregarAlertas();
    } catch (error) {
      console.error(error);
    }
  };

  // ================================
  // FRONT-END
  // ================================
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gerenciar Alertas</h1>

      {/* FORM */}
      <div className="bg-white shadow rounded p-4 mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {editingId ? "Editar Alerta" : "Criar Novo Alerta"}
        </h2>

        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          name="nivel"
          placeholder="Nível (ex: Baixo, Médio, Alto)"
          value={form.nivel}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />

        <button
          onClick={editingId ? atualizarAlerta : criarAlerta}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Atualizar" : "Criar"}
        </button>
      </div>

      {/* LISTA */}
      <h2 className="text-xl font-semibold mb-3">Lista de Alertas</h2>

      <div className="space-y-3">
        {alertas.map((a) => (
          <div key={a.id_alerta} className="bg-white shadow p-4 rounded flex justify-between">
            <div>
              <h3 className="text-lg font-bold">{a.titulo}</h3>
              <p>{a.descricao}</p>
              <span className="text-sm text-gray-600">Nível: {a.nivel}</span>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => editarAlerta(a)}
              >
                Editar
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => deletarAlerta(a.id_alerta!)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
