import { Link, useLoaderData } from "react-router"
import { Button } from "~/components/ui/button"
import { formatDate, formatTime, formatValue } from "~/lib/utils"
import { DetalhePedido } from "~/components/pedido-status"
import { listarPedidos } from "~/utils/http/pedidos/listar-pedidos"
import { ModalHeader } from "~/components/modal-header"

export async function loader() {
  const pedidos = await listarPedidos()

  return pedidos
}

export function RelatorioDePedidos() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="RELATÓRIO DE PEDIDOS" />
      <div className="grid grid-cols-3 mt-4">
        <div className="flex flex-col gap-4 col-span-2">
          {data.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white rounded-md w-[550px] h-[180px] border px-4 py-2 flex justify-between"
            >
              <div className="flex flex-col gap-4 font-bold">
                <h2 className="font-bold text-black/55">
                  Pedido: #{pedido.id}
                </h2>
                <span>{pedido.cliente?.nome}</span>
                <span>Valor total: {formatValue(pedido.valorTotal)}</span>
              </div>
              <div className="flex flex-col gap-4 items-center font-bold">
                <span>
                  Horário do Pedido: {formatTime(new Date(pedido.createdAt))}
                </span>
                <span>Data: {formatDate(new Date(pedido.createdAt))}</span>
                <DetalhePedido status={pedido.status} />
                <Link
                  to={`/movimento/pedidos/${pedido.id}`}
                  className="text-black/55"
                >
                  Mais detalhes do pedido
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button
            variant="success"
            onClick={() =>
              window.open("http://localhost:3000/relatorio/pedidos")
            }
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  )
}
