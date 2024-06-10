import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx"
import Menu from "../assets/menu.svg"
import Sininho from "../assets/sininho.svg"
import Logo from "../assets/v-projects_logo.svg"

function Header() {
    return (
        <div className="fixed w-full bg-branco flex justify-between shadow-md py-5 z-10">
            <div className="flex items-center ml-8">
                <button>
                    <img src={Menu} alt="Menu" />
                </button>
                <div className="ml-2">
                    <img src={Logo} className="w-40 h-12" alt="Logo V-Projects" />
                </div>
            </div>
            <div className="flex mr-10 space-x-6 items-center">
                <button>
                    <img src={Sininho} alt="Sininho de notificações" />
                </button>
                <div className="h-14 border-l border-slate-200 mr-2"></div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default Header;