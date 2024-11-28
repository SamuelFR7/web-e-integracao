import { api } from "~/lib/api"

type MostrarPedidoResponse = {
  id: number
  status:
    | "Pendente"
    | "Recebido"
    | "Em preparo"
    | "Entregador a caminho"
    | "Entregue"
    | "Cancelado"
  clienteId: number
  cep: string
  rua: string
  numero: number
  complemento: string | null
  bairro: string
  createdAt: string
  observacao: string | null
  formaDePagamento: string
  cliente: {
    nome: string
    cpf: string
  }
  produtosPedidos: {
    id: number
    pedidoId: number
    produtoId: number
    quantidade: number
    produto: {
      nome: string
      preco: number
    }
  }[]
}

export async function mostrarPedido(id: number) {
  const { data } = await api.get<MostrarPedidoResponse>(`/pedidos/${id}`)

  return data
}
