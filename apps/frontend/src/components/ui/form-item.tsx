import { ReactNode } from "react"
import { cn } from "~/lib/utils"

export function FormItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn("space-y-1", className)}>{children}</div>
}
