import axios from 'axios'

// Todas as chamadas vão para a nossa API
const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export async function login(cpf: string, senha: string) {
  const resposta = await api.post('/auth/login', { cpf, senha })
  return resposta.data
}

export async function cadastrarSecretario(
  nome: string,
  cpf: string,
  telefone: string,
  email: string,
  senha: string,
) {
  const resposta = await api.post('/secretarios', { nome, cpf, telefone, email, senha })
  return resposta.data
}