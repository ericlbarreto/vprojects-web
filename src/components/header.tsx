import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Menu from "../assets/menu.svg";
import Sininho from "../assets/sininho.svg";
import Logo from "../assets/v-projects_logo.svg";
import Sidebar from "./sidebar";
import { useAuth } from "@/contexts/authContext";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const { getUserData } = useAuth();
  const user = getUserData();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="fixed w-full bg-branco flex justify-between shadow-md py-5 z-50">
        <div className="flex items-center ml-8">
          <button onClick={toggleSidebar}>
            <img src={Menu} alt="Menu" />
          </button>
          <div className="ml-4">
            <Link to={user?.role === "SOCIO" ? "/homeSocio" : "/"}>
              <img src={Logo} className="w-36 h-12" alt="Logo V-Projects" />
            </Link>
          </div>
        </div>
        {user?.role === "SOCIO" && (
          <div className="flex items-center relative">
            <Input
              className="bg-azulBackground border-none w-[512px] focus:outline-none focus:border-roxoPrincipal "
              placeholder="Pesquise o nome do colaborador"
            />
            <FaSearch className="text-cinza absolute right-4 cursor-pointer" />
          </div>
        )}
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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Header;
