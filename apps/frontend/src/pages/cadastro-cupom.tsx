import { z } from "zod"
import { Input } from "~/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import { Save } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { criarCupom } from "~/utils/http/cupons/criar-cupom"
import { ModalHeader } from "~/components/modal-header"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"

const formSchema = z.object({
  codigo: z.string().max(10, "No máximo dez caracteres").toUpperCase(),
  valor: z.coerce.number().transform((v) => v * 100),
})

type Input = z.infer<typeof formSchema>

export function CadastroCupom() {
  const navigate = useNavigate()
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      valor: 0,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: Input) => await criarCupom(data),
    onSuccess() {
      form.reset()
      navigate("/cadastro/cupons")
    },
  })

  function onSubmit(data: Input) {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ModalHeader title="CADASTRO CUPONS" goBack="/cadastro/cupons" />
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
