import { z } from "zod"
import { FormItem } from "~/components/ui/form-item"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { cpf } from "br-docs-validator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormMessage } from "~/components/ui/form-message"
import { Button } from "~/components/ui/button"
import { Save } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { api } from "~/lib/api"
import { useLoaderData, useNavigate } from "react-router"

const formSchema = z.object({
  codigo: z.string().optional(),
  apelido: z.string().optional(),
  nome: z.string().optional(),
  tipo: z.string().optional(),
  cpf: z
    .string()
    .refine((v) => cpf.isValid(v), "CPF inválido")
    .optional(),
  cep: z.string().optional(),
  rua: z.string().optional(),
  numero: z.number().positive().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
})

type Input = z.infer<typeof formSchema>

export function AtualizarCliente() {
  const data = useLoaderData<{
    id: number
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
  }>()
  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apelido: data.apelido,
      bairro: data.bairro,
      cep: data.cep,
      codigo: data.codigo,
      complemento: data.complemento ?? "",
      cpf: data.cpf,
      nome: data.nome,
      numero: data.numero,
      rua: data.rua,
      tipo: data.tipo ?? "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (values: Input) =>
      await api.patch(`/clientes/${data.id}`, values),
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
      <h1 className="font-bold text-2xl self-center">ATUALIZAR CLIENTE</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <FormItem>
            <Label>CODIGO</Label>
            <Input {...form.register("codigo")} />
            <FormMessage message={form.formState.errors.codigo?.message} />
          </FormItem>
          <FormItem className="col-span-2">
            <Label>Apelido/Nome Fantasia</Label>
            <Input {...form.register("apelido")} />
            <FormMessage message={form.formState.errors.apelido?.message} />
          </FormItem>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormItem className="col-span-2">
            <Label>Nome</Label>
            <Input {...form.register("nome")} />
            <FormMessage message={form.formState.errors.nome?.message} />
          </FormItem>
          <FormItem>
            <Label>Tipo</Label>
            <Input {...form.register("tipo")} />
            <FormMessage message={form.formState.errors.tipo?.message} />
          </FormItem>
          <FormItem>
            <Label>CPF</Label>
            <Input {...form.register("cpf")} />
            <FormMessage message={form.formState.errors.cpf?.message} />
          </FormItem>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormItem>
            <Label>CEP</Label>
            <Input {...form.register("cep")} />
            <FormMessage message={form.formState.errors.cep?.message} />
          </FormItem>
          <FormItem className="col-span-2">
            <Label>Rua</Label>
            <Input {...form.register("rua")} />
            <FormMessage message={form.formState.errors.rua?.message} />
          </FormItem>
          <FormItem>
            <Label>Numero</Label>
            <Input
              {...form.register("numero", {
                valueAsNumber: true,
              })}
              type="number"
            />
            <FormMessage message={form.formState.errors.numero?.message} />
          </FormItem>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <FormItem>
            <Label>Complemento</Label>
            <Input {...form.register("complemento")} />
            <FormMessage message={form.formState.errors.complemento?.message} />
          </FormItem>
          <FormItem className="col-span-2">
            <Label>Bairro</Label>
            <Input {...form.register("bairro")} />
            <FormMessage message={form.formState.errors.bairro?.message} />
          </FormItem>
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" className="w-[150px]">
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
          <img src="/logo-no-opacity.png" />
        </div>
      </form>
    </div>
  )
}
