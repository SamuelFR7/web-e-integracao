import { z } from "zod"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import { Save } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router"
import { listarCategorias } from "~/utils/http/categorias/listar-categorias"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { atualizarProduto } from "~/utils/http/produtos/atualizar-produto"
import { mostrarProduto } from "~/utils/http/produtos/mostrar-produto"
import { invariantResponse } from "~/lib/utils"

const formSchema = z.object({
  nome: z.string().optional(),
  tamanho: z.enum(["P", "M", "G"]).optional(),
  categoriaId: z.coerce.number().optional(),
  preco: z.coerce
    .number()
    .transform((v) => v * 100)
    .optional(),
})

type Input = z.infer<typeof formSchema>

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id

  invariantResponse(id, "Id is missing")

  const produto = await mostrarProduto(Number(id))
  const categorias = await listarCategorias()

  return { produto, categorias }
}

export function AtualizarProduto() {
  const { categorias, produto } = useLoaderData<typeof loader>()

  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: produto.nome,
      preco: produto.preco / 100,
      tamanho: produto.tamanho,
      categoriaId: produto.categoriaId,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: Input) => atualizarProduto(produto.id, data),
    onSuccess() {
      form.reset()
      navigate("/cadastro/produtos")
    },
  })

  function onSubmit(data: Input) {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="font-bold text-2xl self-center">ATUALIZAR PRODUTO</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>NOME</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-4 gap-2">
            <FormField
              control={form.control}
              name="tamanho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TAMANHO</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tamanho" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="P">P</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoriaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CATEGORIA</FormLabel>
                  <Select
                    defaultValue={String(field.value)}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem
                          key={categoria.id}
                          value={String(categoria.id)}
                        >
                          {categoria.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PREÇO</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
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
