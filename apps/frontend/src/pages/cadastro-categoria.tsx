import { z } from "zod"
import { FormItem } from "~/components/ui/form-item"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
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
  nome: z.string(),
})

type Input = z.infer<typeof formSchema>

export function CadastroCategoria() {
  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      codigo: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: Input) => await api.post("/categorias", data),
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
      <h1 className="font-bold text-2xl self-center">
        CADASTRO CATEGORIA DE PRODUTOS
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormItem>
          <Label>CODIGO</Label>
          <Input {...form.register("codigo")} />
          <FormMessage message={form.formState.errors.codigo?.message} />
        </FormItem>
        <FormItem className="col-span-2">
          <Label>NOME DA CATEGORIA</Label>
          <Input {...form.register("nome")} />
          <FormMessage message={form.formState.errors.nome?.message} />
        </FormItem>
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
