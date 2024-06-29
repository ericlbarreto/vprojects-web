import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Menu from "../assets/menu.svg"
import Sininho from "../assets/sininho.svg"
import Logo from "../assets/v-projects_logo.svg"
import Sidebar from './sidebar';
import Lupa from "../assets/lupe.svg"

function PartnerHeader() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="fixed w-full bg-branco flex justify-between shadow-md py-5 z-40">
        <div className="flex items-center ml-8">
          <button onClick={toggleSidebar}>
            <img src={Menu} alt="Menu" />
          </button>
          <div className="ml-4">
            <a href="/">
              <img src={Logo} className="w-36 h-12" alt="Logo V-Projects" />
            </a>
          </div>
        </div>

        <div className="flex px-10 py-2.5 gap-x-2.5 rounded-lg bg-customBlue ">
            <input 
            type="search"
            placeholder="Pesquise o nome do colaborador"
            className="bg-transparent w-96 border-none"/>
            <button>
                <img src={Lupa} alt="" />
            </button>
        </div>

        <div className="flex mr-10 space-x-6 items-center">
          <button>
            <img src={Sininho} alt="Sininho de notificações"/>
          </button>
          <div className="h-14 border-l border-slate-200 mr-2"></div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default PartnerHeader;
