import { z } from "zod"
import { Input } from "~/components/ui/input"
import { cpf } from "br-docs-validator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import { Save } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router"
import { ModalHeader } from "~/components/modal-header"
import { mostrarCliente } from "~/utils/http/clientes/mostrar-cliente"
import { invariantResponse } from "~/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage
} from "~/components/ui/form"
import { atualizarCliente } from "~/utils/http/clientes/atualizar-cliente"

const formSchema = z.object({
  nome: z.string().optional(),
  cpf: z
    .string()
    .refine((v) => cpf.isValid(v), "CPF inválido")
    .optional(),
  cep: z.string().optional(),
  rua: z.string().optional(),
  numero: z.coerce.number().positive().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
})

type Input = z.infer<typeof formSchema>

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id

  invariantResponse(id, "Id obrigatório")

  const cliente = await mostrarCliente(Number(id))

  return cliente
}

export function AtualizarCliente() {
  const data = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bairro: data.bairro,
      cep: data.cep,
      complemento: data.complemento ?? "",
      cpf: data.cpf,
      nome: data.nome,
      numero: data.numero,
      rua: data.rua,
    },
  })

  const mutation = useMutation({
    mutationFn: async (values: Input) => atualizarCliente(data.id, values),
    onSuccess() {
      form.reset()
      navigate("/cadastro/clientes")
    },
  })

  function onSubmit(values: Input) {
    mutation.mutate(values)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="ATUALIZAR CLIENTE" goBack="/cadastro/clientes" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rua"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUA</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NÚMERO</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="complemento"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>COMPLEMENTO</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BAIRRO</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
