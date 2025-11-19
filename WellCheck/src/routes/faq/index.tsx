export default function FAQ() {
  const faqs = [
    {
      pergunta: "O que este sistema faz?",
      resposta:
        "Gerencia usuários, alertas, tarefas e hábitos diários com CRUD completo conectado ao Oracle."
    },
    {
      pergunta: "Como os dados são armazenados?",
      resposta:
        "A API Java envia e recebe informações diretamente de um banco Oracle usando JDBC."
    },
    {
      pergunta: "Este site é responsivo?",
      resposta:
        "Sim! Ele foi projetado usando TailwindCSS, garantindo adaptação para qualquer tela."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Perguntas Frequentes</h1>

        <div className="space-y-6">
          {faqs.map((f, index) => (
            <div
              key={index}
              className="bg-white shadow p-5 rounded-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {f.pergunta}
              </h2>
              <p className="text-gray-600 mt-2">{f.resposta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
