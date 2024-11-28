import { api } from "~/lib/api"

type MostrarCategoriaResponse = {
  id: number
  nome: string
}

export async function mostrarCategoria(id: number) {
  const { data } = await api.get<MostrarCategoriaResponse>(`/categorias/${id}`)

  return data
}
