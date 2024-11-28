import { useMutation } from "@tanstack/react-query";
import { Pencil, Plus, Trash } from "lucide-react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { ModalHeader } from "~/components/modal-header";
import { Button, buttonVariants } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { cn, formatValue } from "~/lib/utils";
import { deletarCupom } from "~/utils/http/cupons/deletar-cupom";
import { listarCupons } from "~/utils/http/cupons/listar-cupons";

export async function loader() {
  const cupons = await listarCupons()

  return cupons
}

export function ListarCuponsPage() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()

  const mutation = useMutation({
    mutationFn: async (id: number) => await deletarCupom(id),
    onSuccess() {
      navigate("/cadastro/cupons/")
    },
  })

  function handleDelete(id: number) {
    mutation.mutate(id)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="LISTAR CUPONS" />
      <div>
        <Link
          to="/cadastro/cupons/novo"
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
              <TableHead>CÓDIGO</TableHead>
              <TableHead>VALOR</TableHead>
              <TableHead>AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((cupom) => (
              <TableRow key={cupom.id} className="font-bold">
                <TableCell>{cupom.codigo}</TableCell>
                <TableCell>{formatValue(cupom.valor)}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Link
                    className={cn(buttonVariants({ size: "icon" }))}
                    to={`/cadastro/cupons/${cupom.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Button
                    variant="fail"
                    size="icon"
                    onClick={() => handleDelete(cupom.id)}
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
