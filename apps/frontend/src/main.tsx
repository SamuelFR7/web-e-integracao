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
