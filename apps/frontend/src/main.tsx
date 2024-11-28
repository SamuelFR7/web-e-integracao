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
import {
  ListarPedidos,
  loader as listarPedidosLoader,
} from "./pages/listar-pedidos"
import {
  DetalhesDoPedido,
  loader as detalhesDoPedidoLoader,
} from "./pages/detalhes-do-pedido"
import {
  RelatorioDePedidos,
  loader as relatorioDePedidosLoader,
} from "./pages/relatorio-de-pedidos"
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
import {
  AtualizarProduto,
  loader as atualizarProdutoLoader,
} from "./pages/atualizar-produto"
import {
  ListarCuponsPage,
  loader as listarCuponsLoader,
} from "./pages/listar-cupons"
import {
  AtualizarCupom,
  loader as atualizarCupomLoader,
} from "./pages/atualizar-cupom"
import {
  ListarCategoriasPage,
  loader as listarCategoriasLoader,
} from "./pages/listar-categoria"
import {
  AtualizarCategoria,
  loader as atualizarCategoriaLoader,
} from "./pages/atualizar-categoria"

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
                element: <ListarCategoriasPage />,
                loader: listarCategoriasLoader,
              },
              {
                path: "/cadastro/categorias/novo",
                element: <CadastroCategoria />,
              },
              {
                path: "/cadastro/categorias/:id",
                element: <AtualizarCategoria />,
                loader: atualizarCategoriaLoader,
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
                path: "/cadastro/produtos/:id",
                element: <AtualizarProduto />,
                loader: atualizarProdutoLoader,
              },
              {
                path: "/cadastro/cupons",
                element: <ListarCuponsPage />,
                loader: listarCuponsLoader,
              },
              {
                path: "/cadastro/cupons/novo",
                element: <CadastroCupom />,
              },
              {
                path: "/cadastro/cupons/:id",
                element: <AtualizarCupom />,
                loader: atualizarCupomLoader,
              },
              {
                path: "/movimento/pedidos",
                element: <ListarPedidos />,
                loader: listarPedidosLoader,
              },
              {
                path: "/movimento/pedidos/:id",
                element: <DetalhesDoPedido />,
                loader: detalhesDoPedidoLoader,
              },
              {
                path: "/relatorio",
                element: <RelatorioDePedidos />,
                loader: relatorioDePedidosLoader,
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
