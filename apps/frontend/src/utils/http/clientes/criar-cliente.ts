import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

type CriarClienteRequest = {
  nome: string
  cpf: string
  cep: string
  rua: string
  numero: number
  bairro: string
  complemento?: string | null | undefined
}

export async function criarCliente(values: CriarClienteRequest) {
  const { data } = await api.post<DefaultResponse>("/clientes", values)

  return data
}
