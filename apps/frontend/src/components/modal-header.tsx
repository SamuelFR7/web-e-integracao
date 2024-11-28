import { ArrowLeft, X } from "lucide-react"
import { Link } from "react-router"

type ModalHeaderProps = {
  title: string
  goBack?: string
}

export function ModalHeader({ title, goBack }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div />
      <h1 className="font-bold text-2xl self-center">{title}</h1>
      <div className="flex items-center gap-4">
        {goBack && (
          <Link to={goBack}>
            <ArrowLeft className="h-8 w-8" />
          </Link>
        )}
        <Link to="/">
          <X className="h-8 w-8" />
        </Link>
      </div>
    </div>
  )
}
