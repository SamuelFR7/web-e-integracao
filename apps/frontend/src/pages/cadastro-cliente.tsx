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
import { useNavigate } from "react-router"

const formSchema = z.object({
  codigo: z.string(),
  apelido: z.string(),
  nome: z.string(),
  tipo: z.string().optional(),
  cpf: z.string().refine((v) => cpf.isValid(v), "CPF inválido"),
  cep: z.string(),
  rua: z.string(),
  numero: z.number().positive(),
  complemento: z.string().optional(),
  bairro: z.string(),
})

type Input = z.infer<typeof formSchema>

export function CadastroCliente() {
  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apelido: "",
      bairro: "",
      cep: "",
      codigo: "",
      complemento: "",
      cpf: "",
      nome: "",
      numero: 1,
      rua: "",
      tipo: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: Input) => await api.post("/clientes", data),
    onSuccess() {
      form.reset()
      navigate("/")
    },
  })

  function onSubmit(data: Input) {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="font-bold text-2xl self-center">CADASTRO CLIENTES</h1>
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
