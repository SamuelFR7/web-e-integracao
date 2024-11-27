import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

export async function deletarCliente(id: number) {
  const { data } = await api.delete<DefaultResponse>(`/clientes/${id}`)

  return data
}
