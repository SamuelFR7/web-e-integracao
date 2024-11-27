import { api } from "~/lib/api"

type ListarClientesResponse = {
  id: number
  nome: string
  cpf: string
  cep: string
  rua: string
  numero: number
  complemento: string | null
  bairro: string
}[]

export async function listarClientes() {
  const { data } = await api.get<ListarClientesResponse>("/clientes")

  return data
}
