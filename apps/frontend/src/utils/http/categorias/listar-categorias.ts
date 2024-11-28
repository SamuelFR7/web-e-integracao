import { api } from "~/lib/api"

type ListarCategoriasResponse = {
  id: number
  nome: string
}[]

export async function listarCategorias() {
  const { data } = await api.get<ListarCategoriasResponse>("/categorias")

  return data
}
