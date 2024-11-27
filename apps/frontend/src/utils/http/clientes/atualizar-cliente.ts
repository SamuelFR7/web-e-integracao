import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

type AtualizarClienteRequest = {
  nome?: string | undefined
  cpf?: string | undefined
  cep?: string | undefined
  rua?: string | undefined
  numero?: number | undefined
  complemento?: string | null | undefined
  bairro?: string | undefined
}

export async function atualizarCliente(
  id: number,
  values: AtualizarClienteRequest
) {
  const { data } = await api.patch<DefaultResponse>(`/clientes/${id}`, values)

  return data
}
