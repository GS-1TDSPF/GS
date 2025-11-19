// src/services/api.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"; 
// ajuste para a URL pública da sua API Java

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} - ${res.statusText} ${text ? `: ${text}` : ""}`);
  }
  // se sem conteúdo
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // ALERTAS
  listAlertas: () => fetch(`${BASE_URL}/alertas`).then(handleResponse),
  createAlerta: (payload: any) =>
    fetch(`${BASE_URL}/alertas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse),
  updateAlerta: (id: number, payload: any) =>
    fetch(`${BASE_URL}/alertas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse),
  deleteAlerta: (id: number) =>
    fetch(`${BASE_URL}/alertas/${id}`, { method: "DELETE" }).then(handleResponse),

  // CHECKINS
  listCheckins: () => fetch(`${BASE_URL}/checkins`).then(handleResponse),
  createCheckin: (payload: any) =>
    fetch(`${BASE_URL}/checkins`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse),
  updateCheckin: (id: number, payload: any) =>
    fetch(`${BASE_URL}/checkins/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse),
  deleteCheckin: (id: number) =>
    fetch(`${BASE_URL}/checkins/${id}`, { method: "DELETE" }).then(handleResponse),

  // HABITOS
  listHabitos: () => fetch(`${BASE_URL}/habitos`).then(handleResponse),
  createHabito: (payload: any) =>
    fetch(`${BASE_URL}/habitos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse),
  updateHabito: (id: number, payload: any) =>
    fetch(`${BASE_URL}/habitos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse),
  deleteHabito: (id: number) =>
    fetch(`${BASE_URL}/habitos/${id}`, { method: "DELETE" }).then(handleResponse),

  // TAREFAS
  listTarefas: () => fetch(`${BASE_URL}/tarefas`).then(handleResponse),
  createTarefa: (payload: any) =>
    fetch(`${BASE_URL}/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse),
  updateTarefa: (id: number, payload: any) =>
    fetch(`${BASE_URL}/tarefas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse),
  deleteTarefa: (id: number) =>
    fetch(`${BASE_URL}/tarefas/${id}`, { method: "DELETE" }).then(handleResponse),
};
