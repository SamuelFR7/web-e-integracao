import { Link, useLoaderData } from "react-router"
import { Button } from "~/components/ui/button"
import { ListarPedidosResponse } from "./listar-pedidos"
import { formatDate, formatTime, formatValue } from "~/lib/utils"
import { DetalhePedido } from "~/components/pedido-status"

export function RelatorioDePedidos() {
  const data = useLoaderData<ListarPedidosResponse>()

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="font-bold text-2xl self-center">RELATÓRIO DE PEDIDOS</h1>
      <div className="grid grid-cols-3 mt-4">
        <div className="flex flex-col gap-4 col-span-2">
          {data.pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white rounded-md w-[550px] h-[180px] border px-4 py-2 flex justify-between"
            >
              <div className="flex flex-col gap-4 font-bold">
                <h2 className="font-bold text-black/55">
                  Pedido: #{pedido.id}
                </h2>
                <span>{pedido.cliente.nome}</span>
                <span>Valor total: {formatValue(pedido.valorTotal)}</span>
              </div>
              <div className="flex flex-col gap-4 items-center font-bold">
                <span>Horário do Pedido: {formatTime(pedido.craetedAt)}</span>
                <span>Data: {formatDate(pedido.craetedAt)}</span>
                <DetalhePedido status={pedido.status} />
                <Link to={`/movimento/pedidos/${pedido.id}`} className="text-black/55">Mais detalhes do pedido</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button>Imprimir</Button>
          <Button variant="success">Exportar</Button>
        </div>
      </div>
    </div>
  )
}
