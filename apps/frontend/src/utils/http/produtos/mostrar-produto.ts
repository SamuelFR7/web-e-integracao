import { api } from "~/lib/api"

type MostrarProdutoResponse = {
  id: number
  nome: string
  tamanho: "P" | "M" | "G"
  categoriaId: number
  preco: number
  imagem: string
}

export async function mostrarProduto(id: number) {
  const { data } = await api.get<MostrarProdutoResponse>(`/produtos/${id}`)

  return data
}
