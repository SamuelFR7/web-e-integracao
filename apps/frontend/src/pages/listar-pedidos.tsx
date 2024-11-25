import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { Link } from "react-router"
import { DetalhePedido } from "~/components/pedido-status"
import { api } from "~/lib/api"

export type ListarPedidosResponse = {
  pedidos: {
    id: number
    status:
      | "Pendente"
      | "Recebido"
      | "Em preparo"
      | "Entregador a caminho"
      | "Entregue"
      | "Cancelado"
    cliente: {
      nome: string
    }
    craetedAt: Date
    valorTotal: number
  }[]
}

export function ListarPedidos() {
  const { data: result, isLoading } = useQuery({
    queryKey: ["pedidos"],
    queryFn: async () => {
      const { data } = await api.get<ListarPedidosResponse>("/pedidos")

      return data
    },
  })

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div />
        <h1 className="font-bold text-2xl self-center">
          LISTA DE PEDIDOS EM ANDAMENTO
        </h1>
        <Link to="/">
          <X className="h-8 w-8" />
        </Link>
      </div>
      <div className="space-y-4 w-[450px]">
        {result &&
          !isLoading &&
          result.pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white border rounded-md p-4 grid grid-cols-2"
            >
              <div className="mt-auto space-y-2">
                <h2 className="text-xl font-bold">{pedido.cliente.nome}</h2>
                <h3 className="font-bold">
                  Entregar até{" "}
                  {new Intl.DateTimeFormat("pt-BR", {
                    timeStyle: "short",
                  }).format(pedido.craetedAt)}
                </h3>
              </div>
              <div className="ml-auto flex flex-col space-y-4 items-center">
                <h3 className="font-bold">Nr. pedido: #{pedido.id}</h3>
                <DetalhePedido status={pedido.status} />
                <Link
                  className="text-[#6C6868] font-bold text-sm"
                  to={`/movimento/pedidos/${pedido.id}`}
                >
                  Clique para mais detalhes
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}


