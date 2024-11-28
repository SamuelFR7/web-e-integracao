import { api } from "~/lib/api"

type ListarCuponsResponse = {
  id: number
  codigo:string 
  valor: number
}[]

export async function listarCupons() {
  const { data } = await api.get<ListarCuponsResponse>('/cupons')

  return data
}
