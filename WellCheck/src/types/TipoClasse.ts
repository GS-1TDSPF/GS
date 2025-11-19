// src/types.ts
export type Alert = {
  id_alerta: number;
  tipo_alerta: string;
  mensagem: string;
  data_alerta: string; // ou Date dependendo do backend
};

export type Checkin = {
  id_checkin: number;
  humor: number;
  estresse: number;
  energia: number;
  comentario: string;
  data_registro: string;
};

export type Habito = {
  id_habito: number;
  horas_sono: number;
  agua_ml: number;
  exercicio_minutos: number;
  pausas: number;
  qualidade_alimentacao: number;
  data_registro: string;
};

export type Tarefa = {
  id_tarefa: number;
  titulo: string;
  descricao: string;
  data_criacao: string;
  data_conclusao?: string | null;
  status: string;
};
