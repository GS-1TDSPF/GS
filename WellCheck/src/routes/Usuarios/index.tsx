import { useEffect, useState } from "react";

interface Usuario {
    id_usuario: number;
    nome: string;
    email: string;
    senha: string;
    cargo: string;
}

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [form, setForm] = useState<Omit<Usuario, "id_usuario">>({
        nome: "",
        email: "",
        senha: "",
        cargo: ""
    });

    const [editId, setEditId] = useState<number | null>(null);

    const API = "http://localhost:8080/usuarios";

    async function carregar() {
        const r = await fetch(API);
        const data = await r.json();
        setUsuarios(data);
    }

    useEffect(() => {
        carregar();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

        setForm({ nome: "", email: "", senha: "", cargo: "" });
        setEditId(null);
        carregar();
    }

    function editar(u: Usuario) {
        setEditId(u.id_usuario);
        setForm({
            nome: u.nome,
            email: u.email,
            senha: u.senha,
            cargo: u.cargo
        });
    }

    async function excluir(id: number) {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        carregar();
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Usuários</h1>

            <form onSubmit={salvar} className="bg-white shadow p-4 rounded mb-6">
                <div className="grid grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={form.email}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={form.senha}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="cargo"
                        placeholder="Cargo"
                        value={form.cargo}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                    {editId ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">ID</th>
                        <th className="p-2">Nome</th>
                        <th className="p-2">E-mail</th>
                        <th className="p-2">Cargo</th>
                        <th className="p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id_usuario} className="border-b">
                            <td className="p-2">{u.id_usuario}</td>
                            <td className="p-2">{u.nome}</td>
                            <td className="p-2">{u.email}</td>
                            <td className="p-2">{u.cargo}</td>

                            <td className="p-2 flex gap-2">
                                <button
                                    onClick={() => editar(u)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => excluir(u.id_usuario)}
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
