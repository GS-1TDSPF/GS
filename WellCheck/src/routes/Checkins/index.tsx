import { useEffect, useState } from "react";

interface Checkin {
    id_checkin: number;
    id_usuario: number;
    data: string;
    humor: string;
    comentario: string;
}

export default function Checkins() {
    const [checkins, setCheckins] = useState<Checkin[]>([]);
    const [form, setForm] = useState<Omit<Checkin, "id_checkin">>({
        id_usuario: 0,
        data: "",
        humor: "",
        comentario: ""
    });
    const [editId, setEditId] = useState<number | null>(null);

    const API = "http://localhost:8080/checkins";

    async function carregar() {
        const r = await fetch(API);
        const data = await r.json();
        setCheckins(data);
    }

    useEffect(() => {
        carregar();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

        setForm({ id_usuario: 0, data: "", humor: "", comentario: "" });
        setEditId(null);
        carregar();
    }

    async function editar(item: Checkin) {
        setEditId(item.id_checkin);
        setForm({
            id_usuario: item.id_usuario,
            data: item.data,
            humor: item.humor,
            comentario: item.comentario
        });
    }

    async function excluir(id: number) {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        carregar();
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Check-ins</h1>

            {/* Formulário */}
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
                        type="date"
                        name="data"
                        value={form.data}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="humor"
                        placeholder="Humor"
                        value={form.humor}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                    <textarea
                        name="comentario"
                        placeholder="Comentário"
                        value={form.comentario}
                        onChange={handleChange}
                        className="border p-2 rounded col-span-2"
                    ></textarea>
                </div>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                    {editId ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            {/* Tabela */}
            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">ID</th>
                        <th className="p-2">Usuário</th>
                        <th className="p-2">Data</th>
                        <th className="p-2">Humor</th>
                        <th className="p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {checkins.map(c => (
                        <tr key={c.id_checkin} className="border-b">
                            <td className="p-2">{c.id_checkin}</td>
                            <td className="p-2">{c.id_usuario}</td>
                            <td className="p-2">{c.data}</td>
                            <td className="p-2">{c.humor}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    onClick={() => editar(c)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-600 text-white rounded"
                                    onClick={() => excluir(c.id_checkin)}
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
