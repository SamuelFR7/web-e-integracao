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
import { cn } from "~/lib/utils"
import { deletarCategoria } from "~/utils/http/categorias/deletar-categoria"
import { listarCategorias } from "~/utils/http/categorias/listar-categorias"

export async function loader() {
  const categorias = await listarCategorias()

  return categorias
}

export function ListarCategoriasPage() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()

  const mutation = useMutation({
    mutationFn: async (id: number) => await deletarCategoria(id),
    onSuccess() {
      navigate("/cadastro/categorias/")
    },
  })

  function handleDelete(id: number) {
    mutation.mutate(id)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="LISTAR CATEGORIAS" />
      <div>
        <Link
          to="/cadastro/categorias/novo"
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
              <TableHead>AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((categoria) => (
              <TableRow key={categoria.id} className="font-bold">
                <TableCell>{categoria.nome}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Link
                    className={cn(buttonVariants({ size: "icon" }))}
                    to={`/cadastro/categorias/${categoria.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Button
                    variant="fail"
                    size="icon"
                    onClick={() => handleDelete(categoria.id)}
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
