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
import {
  CadastroProduto,
  loader as cadastroProdutoLoader,
} from "./pages/cadastro-produto"
import { CadastroCupom } from "./pages/cadastro-cupom"
import { ListarPedidos, ListarPedidosResponse } from "./pages/listar-pedidos"
import { DetalhesDoPedido } from "./pages/detalhes-do-pedido"
import { RelatorioDePedidos } from "./pages/relatorio-de-pedidos"
import {
  ListarCliente,
  loader as listarClienteLoader,
} from "./pages/listar-cliente"
import {
  AtualizarCliente,
  loader as atualizarClienteLoader,
} from "./pages/atualizar-cliente"
import {
  ListarProdutosPage,
  loader as listarProdutosLoader,
} from "./pages/listar-produtos"
import { AtualizarProduto, loader as atualizarProdutoLoader } from "./pages/atualizar-produto"
import { ListarCuponsPage, loader as listarCuponsLoader  } from './pages/listar-cupons'
import { AtualizarCupom, loader as atualizarCupomLoader } from "./pages/atualizar-cupom"

export type GetPedidoResponse = {
  pedido: {
    id: number
    cep: string
    rua: string
    numero: number
    complemento: string | null
    bairro: string
    status:
      | "Pendente"
      | "Recebido"
      | "Em preparo"
      | "Entregador a caminho"
      | "Entregue"
      | "Cancelado"
    clienteId: number
    createdAt: Date
    observacao: string | null
    formaDePagamento: "pix" | "credito" | "debito" | "dinheiro"
    cliente: {
      nome: string
      cpf: string
    }
    produtosPedidos: {
      id: string
      produto: {
        nome: string
        preco: number
      }
    }[]
  }
}

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
                path: "/cadastro/clientes/novo",
                element: <CadastroCliente />,
              },
              {
                path: "/cadastro/clientes",
                element: <ListarCliente />,
                loader: listarClienteLoader,
              },

              {
                path: "/cadastro/clientes/:id",
                element: <AtualizarCliente />,
                loader: atualizarClienteLoader,
              },
              {
                path: "/cadastro/categorias",
                element: <CadastroCategoria />,
              },
              {
                path: "/cadastro/produtos",
                element: <ListarProdutosPage />,
                loader: listarProdutosLoader,
              },
              {
                path: "/cadastro/produtos/novo",
                element: <CadastroProduto />,
                loader: cadastroProdutoLoader,
              },
              {
                path: '/cadastro/produtos/:id',
                element: <AtualizarProduto />,
                loader: atualizarProdutoLoader
              },
              {
                path: '/cadastro/cupons',
                element: <ListarCuponsPage />,
                loader: listarCuponsLoader
              },
              {
                path: "/cadastro/cupons/novo",
                element: <CadastroCupom />,
              },
              {
                path: '/cadastro/cupons/:id',
                element: <AtualizarCupom />,
                loader: atualizarCupomLoader,
              },
              {
                path: "/movimento/pedidos",
                element: <ListarPedidos />,
              },
              {
                path: "/movimento/pedidos/:id",
                element: <DetalhesDoPedido />,
                loader: async ({ params }) => {
                  const id = params.id

                  if (!id) {
                    return redirect("/")
                  }

                  const { data } = await api.get<GetPedidoResponse>(
                    `/pedidos/${id}`
                  )

                  return data
                },
              },
              {
                path: "/relatorio",
                element: <RelatorioDePedidos />,
                loader: async () => {
                  const { data } =
                    await api.get<ListarPedidosResponse>("/pedidos")

                  return data
                },
              },
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
