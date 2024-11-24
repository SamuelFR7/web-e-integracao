import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import "./index.css"
import { IndexPage } from "./pages"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query-client"

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)
