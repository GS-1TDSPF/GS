import { useEffect, useState } from "react";

interface Tarefa {
    id_tarefa: number;
    id_usuario: number;
    titulo: string;
    descricao: string;
    prioridade: string;
    concluida: string;
}

export default function Tarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [form, setForm] = useState<Omit<Tarefa, "id_tarefa">>({
        id_usuario: 0,
        titulo: "",
        descricao: "",
        prioridade: "Média",
        concluida: "N"
    });

    const [editId, setEditId] = useState<number | null>(null);

    const API = "http://localhost:8080/tarefas";

    async function carregar() {
        const r = await fetch(API);
        const data = await r.json();
        setTarefas(data);
    }

    useEffect(() => {
        carregar();
    }, []);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function salvar(e: React.FormEvent) {
        e.preventDefault();

        const metodo = editId ? "PUT" : "POST";
        const url = editId ? `${API}/${editId}` : API;

        await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setForm({
            id_usuario: 0,
            titulo: "",
            descricao: "",
            prioridade: "Média",
            concluida: "N"
        });

        setEditId(null);
        carregar();
    }

    function editar(t: Tarefa) {
        setEditId(t.id_tarefa);
        setForm({
            id_usuario: t.id_usuario,
            titulo: t.titulo,
            descricao: t.descricao,
            prioridade: t.prioridade,
            concluida: t.concluida
        });
    }

    async function excluir(id: number) {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        carregar();
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Tarefas</h1>

            {/* Form */}
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
                    />

                    <select
                        name="prioridade"
                        value={form.prioridade}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option>Alta</option>
                        <option>Média</option>
                        <option>Baixa</option>
                    </select>

                    <select
                        name="concluida"
                        value={form.concluida}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="N">Em Aberto</option>
                        <option value="S">Concluída</option>
                    </select>
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
                        <th className="p-2">Título</th>
                        <th className="p-2">Prioridade</th>
                        <th className="p-2">Concluída</th>
                        <th className="p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map(t => (
                        <tr key={t.id_tarefa} className="border-b">
                            <td className="p-2">{t.id_tarefa}</td>
                            <td className="p-2">{t.id_usuario}</td>
                            <td className="p-2">{t.titulo}</td>
                            <td className="p-2">{t.prioridade}</td>
                            <td className="p-2">{t.concluida}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    onClick={() => editar(t)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => excluir(t.id_tarefa)}
                                    className="px-3 py-1 bg-red-600 text-white rounded"
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
