import { useMutation } from "@tanstack/react-query"
import { Pencil, Plus, Trash } from "lucide-react"
import { Link, useLoaderData, useNavigate } from "react-router"
import { ModalHeader } from "~/components/modal-header"
import { Button, buttonVariants } from "~/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { api } from "~/lib/api"
import { cn } from "~/lib/utils"
import { deletarCliente } from "~/utils/http/clientes/deletar-cliente"
import { listarClientes } from "~/utils/http/clientes/listar-clientes"

export async function loader() {
  const clientes = await listarClientes()

  return clientes
}

export function ListarCliente() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()

  const mutation = useMutation({
    mutationFn: async (id: number) => await deletarCliente(id),
    onSuccess() {
      navigate("/cadastro/clientes/")
    },
  })

  function handleDelete(id: number) {
    mutation.mutate(id)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="LISTAR CLIENTES" />
      <div>
        <Link
          to="/cadastro/clientes/novo"
          className={cn(buttonVariants(), "w-28")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo
        </Link>
      </div>
      <div className="bg-white border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="font-medium">
              <TableHead>NOME</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((cliente) => (
              <TableRow key={cliente.id} className="font-bold">
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.cpf}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Link
                    className={cn(buttonVariants({ size: "icon" }))}
                    to={`/cadastro/clientes/${cliente.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Button
                    variant="fail"
                    size="icon"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
