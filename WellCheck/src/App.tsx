// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Alertas from "./routes/Alertas";
import Checkins from "./routes/Checkins";
import Habitos from "./routes/HabitosDiarios";
import Tarefas from "./routes/Tarefas";
import Home from "./routes/Home";
import Usuarios from "./routes/Usuarios";
import Erro from "./routes/Error";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-gray-800 shadow p-4">
          <nav className="max-w-5xl mx-auto flex gap-4">
            <Link to="/alertas" className="hover:underline">Alertas</Link>
            <Link to="/checkins" className="hover:underline">Checkins</Link>
            <Link to="/habitos" className="hover:underline">Hábitos</Link>
            <Link to="/tarefas" className="hover:underline">Tarefas</Link>
          </nav>
        </header>

        <BrowserRouter>
            <Routes>
                {/* Suas rotas normais */}
                <Route path="/" element={<Home />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/tarefas" element={<Tarefas />} />
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/checkins" element={<Checkins />} />
                <Route path="/habitos" element={<Habitos />} />

                {/* Rota de erro */}
                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>

        <main className="py-6">
          <Routes>
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/checkins" element={<Checkins />} />
            <Route path="/habitos" element={<Habitos />} />
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="*" element={<div className="p-4 max-w-5xl mx-auto">Escolha uma rota no menu.</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
