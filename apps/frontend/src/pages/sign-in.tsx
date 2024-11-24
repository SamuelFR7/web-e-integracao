import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { api } from "~/lib/api"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { FormItem } from "~/components/ui/form-item"
import { FormMessage } from "~/components/ui/form-message"
import { useNavigate } from "react-router"

const formSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
})

type Input = z.infer<typeof formSchema>

export function SignInPage() {
  const navigate = useNavigate()

  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: Input) =>
      await api.post<{ message: string }>("/auth/sign-in", data),
    onSuccess() {
      navigate("/")
    },
  })

  function onSubmit(values: Input) {
    mutation.mutate(values)
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-background grid grid-cols-2 rounded-md py-24 px-12">
        <img src="/logo.png" />
        <div className="bg-[#F9EEA1] rounded-md border border-[#DF1A1D] px-8 py-4">
          <div className="flex items-center justify-between">
            <span>Seja bem-vindo.</span>
            <img src="/logo-no-opacity.png" className="w-20 h-24" />
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem>
              <Label>Email:</Label>
              <Input {...form.register("email")} />
              <FormMessage message={form.formState.errors.email?.message} />
            </FormItem>
            <FormItem>
              <Label>Senha:</Label>
              <Input {...form.register("senha")} type="password" />
              <FormMessage message={form.formState.errors.senha?.message} />
            </FormItem>
            <Button type="submit" variant="success">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
