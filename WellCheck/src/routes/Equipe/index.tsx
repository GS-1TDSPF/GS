export default function Equipe() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Equipe</h1>

      <div className="border p-4 rounded shadow w-64">
        <img src="/foto.jpg" className="rounded mb-2" />
        <h2 className="font-bold">Pedro Sakai</h2>
        <p>RM: 565956</p>
        <p>Turma: 1TDSPF</p>
        <a className="text-blue-500" href="https://github.com/sakaipedro">GitHub</a><br />
        <img src="/foto.jpg" className="rounded mb-2" />

        <h2 className="font-bold">Kauan Vieira</h2>
        <p>RM: 565403</p>
        <p>Turma: 1TDSPF</p>
        <a className="text-blue-500" href="https://github.com/KauanVLima">GitHub</a><br />
      </div>
    </div>
  );
}
