import { api } from "~/lib/api"

type ListarProdutosResponse = {
  id: number
  nome: string
  tamanho: "P" | "M" | "G"
  categoriaId: number
  preco: number
  imagem: string
}[]

export async function listarProdutos() {
  const { data } = await api.get<ListarProdutosResponse>("/produtos")

  return data
}
