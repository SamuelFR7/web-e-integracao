import { api } from "~/lib/api"

type MostrarCupomResponse = {
  id: number
  codigo: string
  valor: number
}

export async function mostrarCupom(id: number) {
  const { data } = await api.get<MostrarCupomResponse>(`/cupons/${id}`)

  return data
}
