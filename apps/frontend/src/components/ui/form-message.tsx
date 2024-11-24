export function FormMessage({ message }: { message?: string }) {
  return <p className="text-red text-sm font-medium">{message}</p>
}
