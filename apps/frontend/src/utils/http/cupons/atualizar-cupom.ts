import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

type CriarCupomRequest = {
  codigo?: string
  valor?: number
}

export async function atualizarCupom(id: number, values: CriarCupomRequest) {
  const { data } = await api.patch<DefaultResponse>(`/cupons/${id}`, values)

  return data
}
