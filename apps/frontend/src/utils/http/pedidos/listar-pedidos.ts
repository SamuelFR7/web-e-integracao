import { api } from "~/lib/api"

type ListarPedidosRequest = {
  id: number
  status:
    | "Pendente"
    | "Recebido"
    | "Em preparo"
    | "Entregador a caminho"
    | "Entregue"
    | "Cancelado"
  createdAt: Date
  cliente: {
    nome: string
  } | null
  valorTotal: number
}[]

export async function listarPedidos() {
  const { data } = await api.get<ListarPedidosRequest>("/pedidos")

  return data
}
