import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

type CriarCupomRequest = {
  codigo: string
  valor: number
}

export async function criarCupom(values: CriarCupomRequest) {
  const { data } = await api.post<DefaultResponse>("/cupons", values)

  return data
}
