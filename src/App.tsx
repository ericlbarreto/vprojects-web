import "./global.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Menu from "./assets/menu.svg"
import Sininho from "./assets/sininho.svg"



export default function App() {

  return (
    <>
      <div className='h-screen bg-azulBackground'>
        <div className='bg-branco flex justify-between m-8'>
          <div className="flex space-x-2 mb-8">
            <button><img src= {Menu} alt="Menu" />
            </button>
            <div className="translate-x-6 text-roxoPrincipal">
          <p className="font-bold italic">V-PROJECTS</p>
          <p className="bg-indigo-50 rounded-xl text-center font-extralight h-4 w-20 text-xs translate-x-2.5">S y s t e m</p>
          </div>
          </div>
          <div className="flex space-x-2">
            <button className="-translate-x-12 mb-6"><img src={Sininho} alt="Sininho de notificações"/></button>
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
