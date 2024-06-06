import "./global.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Menu from "./assets/menu.svg"
import Sininho from "./assets/sininho.svg"



export default function App() {

  return (
    <>
      <div className='h-screen bg-azulBackground'>
        <div className='bg-branco flex justify-between m-8'>
          <div className="flex space-x-2">
            <button><img src= {Menu} alt="Menu" />
            </button>
            <div className="translate-x-6">
          <p className="text-roxoPrincipal font-bold">V-PROJECTS</p>
          <p>System</p>
          </div>
          </div>
          <div className="flex space-x-2">
            <button className="-translate-x-12"><img src={Sininho} alt="Sininho de notificações"/></button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  )
}
