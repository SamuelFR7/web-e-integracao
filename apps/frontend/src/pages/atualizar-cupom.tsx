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
import { mostrarCupom } from "~/utils/http/cupons/mostrar-cupom"
import { atualizarCupom } from "~/utils/http/cupons/atualizar-cupom"

const formSchema = z.object({
  codigo: z.string().max(10, "No máximo dez caracteres").toUpperCase(),
  valor: z.coerce.number().transform((v) => v * 100),
})

type Input = z.infer<typeof formSchema>

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id

  invariantResponse(id, "Id is missing")

  const cupom = await mostrarCupom(Number(id))

  return cupom
}

export function AtualizarCupom() {
  const data = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: data.codigo,
      valor: data.valor / 100,
    },
  })

  const mutation = useMutation({
    mutationFn: async (values: Input) => await atualizarCupom(data.id, values),
    onSuccess() {
      form.reset()
      navigate("/cadastro/cupons")
    },
  })

  function onSubmit(values: Input) {
    mutation.mutate(values)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="ATUALIZAR CUPOM" goBack="/cadastro/cupons" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CODIGO</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VALOR</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
