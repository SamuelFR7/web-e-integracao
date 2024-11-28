import { Link, useLoaderData } from "react-router"
import { ModalHeader } from "~/components/modal-header"
import { DetalhePedido } from "~/components/pedido-status"
import { listarPedidos } from "~/utils/http/pedidos/listar-pedidos"
import dayjs from "dayjs"

export async function loader() {
  const pedidos = await listarPedidos()

  return pedidos
}

export function ListarPedidos() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="LISTAR PEDIDOS" />
      <div className="space-y-4 w-[450px]">
        {data.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white border rounded-md p-4 grid grid-cols-2"
          >
            <div className="mt-auto space-y-2">
              <h2 className="text-xl font-bold">{pedido.cliente?.nome}</h2>
              <h3 className="font-bold">
                Entregar até{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  timeStyle: "short",
                }).format(
                  dayjs(new Date(pedido.createdAt)).add(30, "minutes").toDate()
                )}
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
