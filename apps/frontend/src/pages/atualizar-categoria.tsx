import { z } from "zod"
import { Input } from "~/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import { Save } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router"
import { ModalHeader } from "~/components/modal-header"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { invariantResponse } from "~/lib/utils"
import { mostrarCategoria } from "~/utils/http/categorias/mostrar-categoria"
import { atualizarCategoria } from "~/utils/http/categorias/atualizar-categoria"

const formSchema = z.object({
  nome: z.string().toUpperCase().optional(),
})

type Input = z.infer<typeof formSchema>

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id

  invariantResponse(id, "Id is missing")

  const categoria = await mostrarCategoria(Number(id))

  return categoria
}

export function AtualizarCategoria() {
  const data = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: data.nome,
    },
  })

  const mutation = useMutation({
    mutationFn: async (values: Input) =>
      await atualizarCategoria(data.id, values),
    onSuccess() {
      form.reset()
      navigate("/cadastro/categorias")
    },
  })

  function onSubmit(values: Input) {
    mutation.mutate(values)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="ATUALIZAR CATEGORIA" goBack="/cadastro/categorias" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NOME</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-[150px]">
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
            <img src="/logo-no-opacity.png" />
          </div>
        </form>
      </Form>
    </div>
  )
}
