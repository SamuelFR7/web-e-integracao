import { cpf } from "br-docs-validator"
import { ReactNode } from "react"
import { LoaderFunctionArgs, useLoaderData } from "react-router"
import { DetalhePedido } from "~/components/pedido-status"
import { invariantResponse } from "~/lib/utils"
import { mostrarPedido } from "~/utils/http/pedidos/mostrar-pedido"
import dayjs from "dayjs"
import { ModalHeader } from "~/components/modal-header"

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id

  invariantResponse(id, "Id is missing")

  const pedido = await mostrarPedido(Number(id))

  return pedido
}

export function DetalhesDoPedido() {
  const pedido = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="DETALHES DO PEDIDOS" goBack="/movimento/pedidos" />
      <Card title={`PEDIDO: #${pedido.id}`}>
        <div className="items-center flex justify-between font-bold">
          <span className="font-bold">
            Horário do Pedido:{" "}
            {new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" }).format(
              new Date(pedido.createdAt)
            )}
          </span>
          <DetalhePedido status={pedido.status} />
        </div>
      </Card>
      <Card title="CLIENTE">
        <div className="space-y-4 flex flex-col">
          <span className="font-bold">{pedido.cliente.nome}</span>
          <span className="font-bold">
            {cpf.punctuated(pedido.cliente.cpf)}
          </span>
        </div>
      </Card>
      <Card title="ENDEREÇO DE ENTREGA">
        <div className="space-y-4 flex flex-col">
          <span className="font-bold">{pedido.cep}</span>
          <span className="font-bold">
            {pedido.rua}, N {pedido.numero}
          </span>
          <span className="font-bold">
            Prazo de entrega:{" "}
            {new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" }).format(
              dayjs(new Date(pedido.createdAt)).add(30, "minutes").toDate()
            )}
          </span>
        </div>
      </Card>
      <Card title="Itens do pedido">
        <table>
          <thead>
            <tr>
              <th className="px-4">QTD</th>
              <th className="px-4 text-left">Item</th>
              <th className="px-4 text-left">Valor</th>
              <th className="px-4">Forma de pagamento</th>
            </tr>
          </thead>
          <tbody>
            {pedido.produtosPedidos.map((produtosPedidos) => (
              <tr key={produtosPedidos.id} className="font-bold">
                <td className="px-4">1</td>
                <td className="px-4 text-left">
                  {produtosPedidos.produto.nome}
                </td>
                <td className="px-4 text-left">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(produtosPedidos.produto.preco / 100)}
                </td>
                <td className="px-4">
                  {pedido.formaDePagamento.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="max-w-[500px] w-full bg-white rounded-md border px-4 py-2 space-y-4">
      <h2 className="font-bold text-black/50">{title.toUpperCase()}</h2>
      {children}
    </div>
  )
}
