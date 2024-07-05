import { SidebarProps } from "@/interfaces/SideBarProps";
import { Cross2Icon, HomeIcon, ReaderIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/contexts/authContext";
import api from "@/services/axiosConfig";
import { useEffect, useState } from "react";
import AtencaoModal from "./atencao";

function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [path, setPath] = useState("/");
  const [atencao, setAtencao] = useState(false);
  const { logout } = useAuth();

  const handleExit = () => {
    logout();
    window.location.reload();
  };

  const [userRole, setUserRole] = useState<string | null>(null);
  const { getUserData } = useAuth();
  const user = getUserData();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = (await api.get(`/api/user/${user?.id}`)).data.role;
        setUserRole(role);
      } catch (error) {
        console.error('Erro ao buscar o papel do usuário:', error);
      }
    };

    fetchUserRole();
  }, [user?.id]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const condAtencao = queryParams.get("atencao");
    const condPath = queryParams.get("path");

    if (condAtencao) {
      setAtencao(true);
    }
    if (condPath) {
      setPath(condPath);
    }
  }, [window.location.search]);

  const handleAtencao = (bool: boolean, newPath: string) => {
    setAtencao(bool);
    setPath(newPath);
  };

  const isColaboradorOnAvaliacaoPage = userRole === "COLABORADOR" && ["/autoavaliacao", "/autoavaliacao/avaliacao-360"].includes(window.location.pathname);
  const isNonColaboradorOnEqualizacaoPage = userRole !== "COLABORADOR" && window.location.pathname === "/equalizacao";

  return (
    <div className={`fixed z-40 inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-white shadow-lg w-64`}>
      <div className="p-4 border-b flex items-center justify-end">
        <button onClick={toggleSidebar} className="text-roxoPrincipal focus:outline-none">
          <Cross2Icon className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-10 p-4">
        <a
          href={userRole === "COLABORADOR" ? (isColaboradorOnAvaliacaoPage ? "" : "/") : isNonColaboradorOnEqualizacaoPage ? "" : "home-socio"}
          onClick={userRole === "COLABORADOR" && isColaboradorOnAvaliacaoPage ? (e) => {
            e.preventDefault();
            handleAtencao(true, "/");
          } : isNonColaboradorOnEqualizacaoPage ? (e) => {e.preventDefault();
            handleAtencao(true, "/home-socio");
          }: undefined}
          className="flex items-center p-2 text-roxoPrincipal hover:bg-azulBackground"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="ml-3">Início</span>
        </a>
        <a href={userRole === "COLABORADOR" ? "/autoavaliacao" : "/controle-de-ciclo"} className="flex items-center p-2 mt-4 text-roxoPrincipal hover:bg-azulBackground">
          <ReaderIcon className="w-5 h-5" />
          <span className="ml-3">{userRole === "COLABORADOR" ? "Avaliações" : "Equalização"}</span>
        </a>
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <a href="" className="flex items-center p-2 text-roxoPrincipal hover:bg-azulBackground">
          <GearIcon className="w-5 h-5" />
          <span className="ml-3">Configurações</span>
        </a>
        <a href="/login" onClick={handleExit} className="flex items-center p-2 mt-4 text-roxoPrincipal hover:bg-azulBackground">
          <ExitIcon className="w-5 h-5" />
          <span className="ml-3">Sair</span>
        </a>
      </div>
      <div className="ml-32rem">{atencao && <AtencaoModal setAtencao={setAtencao} path={path} atencao={atencao} />}</div>
    </div>
  );
}

export default Sidebar;
