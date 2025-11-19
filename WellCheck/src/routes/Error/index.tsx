import { Link } from "react-router-dom";

export default function Erro() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
                
                <h1 className="text-6xl font-extrabold text-red-600 mb-4">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mb-2">
                    Página não encontrada
                </h2>

                <p className="text-gray-600 mb-6">
                    A página que você tentou acessar não existe ou foi movida.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        Ir para Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>

            <p className="text-gray-500 text-sm mt-6">
                Se você acha que isso é um erro, entre em contato com o suporte.
            </p>
        </div>
    );
}
