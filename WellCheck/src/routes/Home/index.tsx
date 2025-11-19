export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bem-vindo ao Sistema de Gestão
        </h1>

        <p className="text-gray-600 text-lg">
          Um sistema completo para gerenciamento de usuários, alertas, tarefas e hábitos diários.
        </p>

        <div className="mt-8">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Acessar Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
