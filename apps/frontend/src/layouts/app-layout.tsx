import { Outlet } from "react-router"

export function AppLayout() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="flex-1 bg-[#0FC27D]"></div>
        <div className="flex-1 bg-[#FFFFE6]"></div>
        <div className="flex-1 bg-[#FE1A2C]"></div>
      </div>

      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  )
}
