import { z } from "zod"
import { FormItem } from "~/components/ui/form-item"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormMessage } from "~/components/ui/form-message"
import { Button } from "~/components/ui/button"
import { Save } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { api } from "~/lib/api"
import { useLoaderData, useNavigate } from "react-router"

const formSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  tamanho: z.enum(["P", "M", "G"]),
  categoriaId: z.coerce.number(),
  preco: z.coerce.number().transform((v) => v * 100),
})

type Input = z.infer<typeof formSchema>

export function CadastroProduto() {
  const { categorias } = useLoaderData<{
    categorias: {
      id: number
      nome: string
    }[]
  }>()

  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      preco: 0,
      codigo: "",
      tamanho: "P",
      categoriaId: 1,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: Input) => await api.post("/produtos", data),
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
      <h1 className="font-bold text-2xl self-center">CADASTRO PRODUTOS</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <FormItem>
            <Label>CODIGO</Label>
            <Input {...form.register("codigo")} />
            <FormMessage message={form.formState.errors.codigo?.message} />
          </FormItem>
          <FormItem className="col-span-2">
            <Label>Nome</Label>
            <Input {...form.register("nome")} />
            <FormMessage message={form.formState.errors.nome?.message} />
          </FormItem>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormItem>
            <Label>TAMANHO</Label>
            <Select
              defaultValue={form.formState.defaultValues?.tamanho}
              onValueChange={(v) =>
                form.setValue("tamanho", v as "P" | "M" | "G")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="P">P</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="G">G</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage message={form.formState.errors.tamanho?.message} />
          </FormItem>
          <FormItem>
            <Label>CATEGORIA</Label>
            <Select
              defaultValue={String(form.formState.defaultValues?.categoriaId)}
              onValueChange={(v) => form.setValue("categoriaId", Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tamanho" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                <SelectItem key={categoria.id} value={String(categoria.id)}>{categoria.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage message={form.formState.errors.categoriaId?.message} />
          </FormItem>
          <FormItem>
            <Label>PREÇO</Label>
            <Input {...form.register("preco")} type="number" step=".01" />
            <FormMessage message={form.formState.errors.preco?.message} />
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
