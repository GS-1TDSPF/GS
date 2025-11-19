export default function Integrantes() {
  const integrantes = [
    { nome: "Pedro Sakai", rm: "565956" },
    { nome: "Kauan Vieira", rm: "RM: 565403" },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Integrantes da Equipe</h1>

        <ul className="space-y-4">
          {integrantes.map((i, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow border border-gray-200"
            >
              <p className="text-lg font-semibold">{i.nome}</p>
              <p className="text-gray-600">RM: {i.rm}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
