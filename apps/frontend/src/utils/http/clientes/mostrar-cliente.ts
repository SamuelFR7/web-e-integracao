import { api } from "~/lib/api"

type MostrarClienteResponse = {
  id: number
  nome: string
  cpf: string
  cep: string
  rua: string
  numero: number
  complemento: string | null
  bairro: string
}

export async function mostrarCliente(id: number) {
  const { data } = await api.get<MostrarClienteResponse>(`/clientes/${id}`)

  return data
}
