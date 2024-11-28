import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

type AtualizarProdutoRequest = {
  nome?: string
  tamanho?: "P" | "M" | "G"
  preco?: number
  categoriaId?: number
}

export async function atualizarProduto(
  id: number,
  values: AtualizarProdutoRequest
) {
  const { data } = await api.patch<DefaultResponse>(`/produtos/${id}`, values)

  return data
}
