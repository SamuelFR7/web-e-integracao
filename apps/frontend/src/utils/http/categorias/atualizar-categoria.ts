import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

type AtualizarCategoriaRequest = {
  nome?: string
}

export async function atualizarCategoria(
  id: number,
  values: AtualizarCategoriaRequest
) {
  const { data } = await api.patch<DefaultResponse>(`/categorias/${id}`, values)

  return data
}
