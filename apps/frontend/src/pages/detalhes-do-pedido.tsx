import { cpf } from "br-docs-validator"
import { ArrowLeft, X } from "lucide-react"
import { ReactNode } from "react"
import { Link, useLoaderData } from "react-router"
import { DetalhePedido } from "~/components/pedido-status"
import { GetPedidoResponse } from "~/main"

export function DetalhesDoPedido() {
  const { pedido } = useLoaderData<GetPedidoResponse>()

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div />
        <h1 className="font-bold text-2xl self-center">DETALHES DO PEDIDOS</h1>
        <div className="flex items-center gap-4">
          <Link to="/movimento/pedidos">
            <ArrowLeft className="h-8 w-8" />
          </Link>
          <Link to="/">
            <X className="h-8 w-8" />
          </Link>
        </div>
      </div>
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
              new Date(pedido.createdAt)
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
                <td className="px-4 text-left">{produtosPedidos.produto.nome}</td>
                <td className="px-4 text-left">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(produtosPedidos.produto.preco / 100)}
                </td>
                <td className="px-4">{pedido.formaDePagamento.toUpperCase()}</td>
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
