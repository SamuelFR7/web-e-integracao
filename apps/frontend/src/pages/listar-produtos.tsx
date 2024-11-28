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
import { cn, formatValue } from "~/lib/utils"
import { deletarProduto } from "~/utils/http/produtos/deletar-produto"
import { listarProdutos } from "~/utils/http/produtos/listar-produtos"

export async function loader() {
  const produtos = await listarProdutos()

  return produtos 
}

export function ListarProdutosPage() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()

  const mutation = useMutation({
    mutationFn: async (id: number) => await deletarProduto(id),
    onSuccess() {
      navigate("/cadastro/produtos/")
    },
  })

  function handleDelete(id: number) {
    mutation.mutate(id)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="LISTAR PRODUTOS" />
      <div>
        <Link
          to="/cadastro/produtos/novo"
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
              <TableHead>PREÇO</TableHead>
              <TableHead>AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((produto) => (
              <TableRow key={produto.id} className="font-bold">
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{formatValue(produto.preco)}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Link
                    className={cn(buttonVariants({ size: "icon" }))}
                    to={`/cadastro/produtos/${produto.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Button
                    variant="fail"
                    size="icon"
                    onClick={() => handleDelete(produto.id)}
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
