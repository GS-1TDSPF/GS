export default function Contato() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Contato</h1>

        <p className="text-gray-600 mb-4 text-center">
          Entre em contato com a equipe por qualquer canal abaixo.
        </p>

        <div className="space-y-4 mt-6">
          <p className="text-gray-800">
             <strong>Email:</strong> equipe.projeto@exemplo.com
          </p>
          <p className="text-gray-800">
             <strong>Telefone:</strong> (11) 99999-9999
          </p>
          <p className="text-gray-800">
             <strong>GitHub:</strong> github.com/seu-repo
          </p>
        </div>
      </div>
    </div>
  );
}
