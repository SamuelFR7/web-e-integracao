import { useMutation } from "@tanstack/react-query"
import { Pencil, Plus, Trash } from "lucide-react"
import { Link, useLoaderData, useNavigate } from "react-router"
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

export function ListarCliente() {
  const navigate = useNavigate()
  const data = useLoaderData<
    {
      codigo: string
      apelido: string
      nome: string
      tipo: string | null
      cpf: string
      cep: string
      rua: string
      numero: number
      complemento: string | null
      bairro: string
      id: number
    }[]
  >()

  const mutation = useMutation({
    mutationFn: async (id: number) => await api.delete(`/clientes/${id}`),
    onSuccess() {
      navigate("/cadastro/clientes/")
    },
  })

  function handleDelete(id: number) {
    mutation.mutate(id)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="font-bold text-2xl self-center">LISTAR CLIENTES</h1>
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
              <TableHead>APELIDO</TableHead>
              <TableHead>AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((cliente) => (
              <TableRow key={cliente.id} className="font-bold">
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.cpf}</TableCell>
                <TableCell>{cliente.apelido}</TableCell>
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
