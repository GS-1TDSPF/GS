import { useEffect, useState } from "react";

interface Habito {
    id_habito: number;
    id_usuario: number;
    titulo: string;
    descricao: string;
    concluido: string;
}

export default function Habitos() {
    const [habitos, setHabitos] = useState<Habito[]>([]);
    const [form, setForm] = useState<Omit<Habito, "id_habito">>({
        id_usuario: 0,
        titulo: "",
        descricao: "",
        concluido: "N"
    });
    const [editId, setEditId] = useState<number | null>(null);

    const API = "http://localhost:8080/habitos";

    async function carregar() {
        const r = await fetch(API);
        const data = await r.json();
        setHabitos(data);
    }

    useEffect(() => {
        carregar();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function salvar(e: React.FormEvent) {
        e.preventDefault();

        const metodo = editId ? "PUT" : "POST";
        const url = editId ? `${API}/${editId}` : API;

        await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        setForm({ id_usuario: 0, titulo: "", descricao: "", concluido: "N" });
        setEditId(null);
        carregar();
    }

    async function editar(h: Habito) {
        setEditId(h.id_habito);
        setForm({
            id_usuario: h.id_usuario,
            titulo: h.titulo,
            descricao: h.descricao,
            concluido: h.concluido
        });
    }

    async function excluir(id: number) {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        carregar();
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Hábitos Diários</h1>

            <form onSubmit={salvar} className="bg-white shadow p-4 rounded mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="id_usuario"
                        placeholder="ID do Usuário"
                        value={form.id_usuario}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={form.titulo}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <textarea
                        name="descricao"
                        placeholder="Descrição"
                        value={form.descricao}
                        onChange={handleChange}
                        className="border p-2 rounded col-span-2"
                    ></textarea>

                    <select
                        name="concluido"
                        value={form.concluido}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="N">Não Concluído</option>
                        <option value="S">Concluído</option>
                    </select>
                </div>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                    {editId ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">ID</th>
                        <th className="p-2">Usuário</th>
                        <th className="p-2">Título</th>
                        <th className="p-2">Concluído</th>
                        <th className="p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {habitos.map(h => (
                        <tr key={h.id_habito} className="border-b">
                            <td className="p-2">{h.id_habito}</td>
                            <td className="p-2">{h.id_usuario}</td>
                            <td className="p-2">{h.titulo}</td>
                            <td className="p-2">{h.concluido}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    onClick={() => editar(h)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-600 text-white rounded"
                                    onClick={() => excluir(h.id_habito)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
