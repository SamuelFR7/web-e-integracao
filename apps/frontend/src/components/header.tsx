import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Button, buttonVariants } from "./ui/button"
import { Link } from "react-router"
import { cn } from "~/lib/utils"

export function Header() {
  return (
    <header className="px-8 py-4">
      <ul className="flex items-center gap-4">
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button className="w-[200px]">CADASTRO</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="space-y-4 mt-4 flex flex-col">
                <DropdownMenu.Item asChild>
                  <Link
                    to="/cadastro/clientes"
                    className={cn(buttonVariants(), "w-[200px]")}
                  >
                    CLIENTES
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/cadastro/produtos"
                    className={cn(buttonVariants(), "w-[200px]")}
                  >
                    PRODUTO
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/cadastro/cupons"
                    className={cn(buttonVariants(), "w-[200px]")}
                  >
                    CUPOM
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/cadastro/categorias"
                    className={cn(buttonVariants(), "w-[200px]")}
                  >
                    CATEGORIA DE PRODUTO
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </li>
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button className="w-[200px]">MOVIMENTO</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="space-y-4 mt-4 flex flex-col">
                <DropdownMenu.Item asChild>
                  <Link
                    to="/movimento/pedidos"
                    className={cn(buttonVariants(), "w-[200px]")}
                  >
                    PEDIDOS
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </li>
        <li>
          <Link to="/relatorio" className={cn(buttonVariants(), "w-[200px]")}>
            RELATORIO
          </Link>
        </li>
      </ul>
    </header>
  )
}
