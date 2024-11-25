import { createRoot } from "react-dom/client"
import { createBrowserRouter, redirect, RouterProvider } from "react-router"
import "./index.css"
import { IndexPage } from "./pages"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query-client"
import { AppLayout } from "./layouts/app-layout"
import { SignInPage } from "./pages/sign-in"
import { api } from "./lib/api"
import { DashboardLayout } from "./layouts/dashboard-layout"
import { ModalLayout } from "./layouts/modal-layout"
import { CadastroCliente } from "./pages/cadastro-cliente"
import { CadastroCategoria } from "./pages/cadastro-categoria"
import { CadastroProduto } from "./pages/cadastro-produto"
import { CadastroCupom } from "./pages/cadastro-cupom"
import { ListarPedidos } from "./pages/listar-pedidos"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignInPage />,
        loader: async () => {
          try {
            await api.get("/auth/me")

            return redirect("/")
          } catch (error) {
            console.log(error)
            return null
          }
        },
      },
      {
        element: <DashboardLayout />,
        loader: async () => {
          try {
            await api.get("/auth/me")

            return null
          } catch (error) {
            console.log(error)
            return redirect("/sign-in")
          }
        },
        children: [
          {
            index: true,
            element: <IndexPage />,
          },
          {
            element: <ModalLayout />,
            children: [
              {
                path: "/cadastro/clientes",
                element: <CadastroCliente />,
              },
              {
                path: "/cadastro/categorias",
                element: <CadastroCategoria />,
              },
              {
                path: "/cadastro/produtos",
                element: <CadastroProduto />,
                loader: async () => {
                  const { data } = await api.get<{
                    categorias: { codigo: number; nome: string; id: number }[]
                  }>("/categorias")

                  return data
                },
              },
              {
                path: '/cadastro/cupons',
                element: <CadastroCupom />
              },
              {
                path: '/movimento/pedidos',
                element: <ListarPedidos />
              }
            ],
          },
        ],
      },
    ],
    hydrateFallbackElement: <h1>Loading...</h1>,
  },
])

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
