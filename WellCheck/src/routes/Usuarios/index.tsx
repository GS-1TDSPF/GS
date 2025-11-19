import { useEffect, useState } from "react";

export default function Usuarios() {
  const [lista, setLista] = useState([]);

  async function carregar() {
    const resp = await fetch("https://sua-api.com/usuarios");
    const data = await resp.json();
    setLista(data);
  }

  useEffect(() => { carregar(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      {lista.map((u: any) => (
        <div key={u.id_usuario} className="p-4 border mb-2 rounded">
          <p><b>Nome:</b> {u.nome}</p>
          <p><b>Email:</b> {u.email}</p>
        </div>
      ))}
    </div>
  );
}
