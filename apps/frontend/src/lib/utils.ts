import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" }).format(date)
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(date)
}

export function formatValue(value: number) {
  return (value / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function invariantResponse(
  value: unknown,
  message: string
): asserts value {
  if (!value) {
    throw new Response(message, {
      status: 400,
    })
  }
}
