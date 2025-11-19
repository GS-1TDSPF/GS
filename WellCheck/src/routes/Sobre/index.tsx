export default function Sobre() {
  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sobre o Projeto</h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          Este sistema foi desenvolvido para demonstrar integração entre React, uma API Java e um
          banco de dados Oracle, permitindo a realização completa das operações CRUD.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Ele inclui módulos para gerenciar usuários, alertas, tarefas e hábitos diários, além de
          páginas institucionais projetadas para a apresentação do projeto.
        </p>

        <p className="text-gray-700 leading-relaxed">
          O objetivo é criar uma aplicação funcional, organizada e com boa arquitetura de
          front-end, atendendo aos requisitos acadêmicos e simulando um sistema real.
        </p>
      </div>
    </div>
  );
}
