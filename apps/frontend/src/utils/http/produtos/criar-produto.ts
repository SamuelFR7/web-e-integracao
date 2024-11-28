import { api } from "~/lib/api"
import { DefaultResponse } from "../types"

type CriarProdutoRequest = {
  nome: string
  tamanho: "P" | "M" | "G"
  preco: number
  categoriaId: number
  imagem: FileList
}

export async function criarProduto(values: CriarProdutoRequest) {
  const formData = new FormData()

  const imagem = values.imagem[0]

  formData.append("nome", values.nome)
  formData.append("tamanho", values.tamanho)
  formData.append("categoriaId", String(values.categoriaId))
  formData.append("preco", String(values.preco))
  formData.append("image", imagem)

  const { data } = await api.post<DefaultResponse>("/produtos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return data
}
