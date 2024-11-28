import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

type CriarCategoriaRequest = {
  nome: string
}

export async function criarCategoria(values: CriarCategoriaRequest) {
  const { data } = await api.post<DefaultResponse>("/categorias", values)

  return data
}
