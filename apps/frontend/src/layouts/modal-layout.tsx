import { Outlet } from "react-router"

export function ModalLayout() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-background h-[90%] max-w-[75%] w-full border border-red-border rounded-md">
        <Outlet />
      </div>
    </div>
  )
}
