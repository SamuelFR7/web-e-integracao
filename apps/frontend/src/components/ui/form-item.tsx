import { ReactNode } from "react"

export function FormItem({ children }: { children: ReactNode }) {
  return <div className="space-y-1">{children}</div>
}
