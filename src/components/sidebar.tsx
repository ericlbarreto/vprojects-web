import { SidebarProps } from "@/interfaces/SideBarProps";
import { Cross2Icon, HomeIcon, ReaderIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons";

function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {

  const handleExit = () => {
    sessionStorage.removeItem('accessToken');
    window.location.reload();
  }

  return (
    <div className={`fixed z-20 inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-white shadow-lg w-64`}>
      <div className="p-4 border-b flex items-center justify-end">
        <button onClick={toggleSidebar} className="text-roxoPrincipal focus:outline-none">
          <Cross2Icon className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-10 p-4">
        <a href="#" className="flex items-center p-2 text-roxoPrincipal hover:bg-azulBackground">
          <HomeIcon className="w-5 h-5" />
          <span className="ml-3">Início</span>
        </a>
        <a href="#" className="flex items-center p-2 mt-4 text-roxoPrincipal hover:bg-azulBackground">
          <ReaderIcon className="w-5 h-5"/>
          <span className="ml-3">Avaliações</span>
        </a>
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <a href="#" className="flex items-center p-2 text-roxoPrincipal hover:bg-azulBackground">
          <GearIcon className="w-5 h-5" />
          <span className="ml-3">Configurações</span>
        </a>
        <a href="#" onClick={handleExit} className="flex items-center p-2 mt-4 text-roxoPrincipal hover:bg-azulBackground">
          <ExitIcon className="w-5 h-5" />
          <span className="ml-3">Sair</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
