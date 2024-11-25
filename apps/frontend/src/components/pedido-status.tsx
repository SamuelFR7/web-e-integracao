export function DetalhePedido({
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
      {["Pendente"].includes(status) && (
        <div className="px-6 rounded-full py-1 bg-[#FF0000]">
          <span className="font-bold">{status}</span>
        </div>
      )}
      {["Recebido"].includes(status) && (
        <div className="px-6 rounded-full py-1 bg-[#0FC27D]">
          <span className="font-bold">{status}</span>
        </div>
      )}
      {["Em preparo"].includes(status) && (
        <div className="px-6 rounded-full py-1 bg-[#FFC300]">
          <span className="font-bold">{status.toUpperCase()}</span>
        </div>
      )}
      {["Entregador a caminho"].includes(status) && (
        <div className="px-6 rounded-full py-1 bg-[#00D0FF]">
          <span className="font-bold">{status}</span>
        </div>
      )}
      {["Entregue"].includes(status) && (
        <div className="px-6 rounded-full py-1 bg-[#0FC27D]">
          <span className="font-bold">{status}</span>
        </div>
      )}
      {["Cancelado"].includes(status) && (
        <div className="px-6 rounded-full py-1 bg-[#FFC300]">
          <span className="font-bold">{status}</span>
        </div>
      )}
    </>
  )
}
