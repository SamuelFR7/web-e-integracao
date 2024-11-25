import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"
import { api } from "~/lib/api"
import { cn } from "~/lib/utils"

type ListarPedidosResponse = {
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
      <h1 className="font-bold text-2xl self-center">
        LISTA DE PEDIDOS EM ANDAMENTO
      </h1>
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

function DetalhePedido({
  status,
}: {
  status:
    | "Pendente"
    | "Recebido"
    | "Em preparo"
    | "Entregador a caminho"
    | "Entregue"
    | "Cancelado"
}) {
  return (
    <>
      {['Pendente'].includes(status) && (
      <div className="px-6 rounded-full py-1 bg-[#FF0000]">
          <span className="font-bold">{status}</span>
      </div>
      )}
      {['Recebido'].includes(status) && (
      <div className="px-6 rounded-full py-1 bg-[#0FC27D]">
          <span className="font-bold">{status}</span>
      </div>
      )}
      {['Em preparo'].includes(status) && (
      <div className="px-6 rounded-full py-1 bg-[#FFC300]">
          <span className="font-bold">{status.toUpperCase()}</span>
      </div>
      )}
      {['Entregador a caminho'].includes(status) && (
      <div className="px-6 rounded-full py-1 bg-[#00D0FF]">
          <span className="font-bold">{status}</span>
      </div>
      )}
      {['Entregue'].includes(status) && (
      <div className="px-6 rounded-full py-1 bg-[#0FC27D]">
          <span className="font-bold">{status}</span>
      </div>
      )}
      {['Cancelado'].includes(status) && (
      <div className="px-6 rounded-full py-1 bg-[#FFC300]">
          <span className="font-bold">{status}</span>
      </div>
      )}
    </>
  )
}

