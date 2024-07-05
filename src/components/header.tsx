import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../assets/menu.svg";
import Sininho from "../assets/sininho.svg";
import Logo from "../assets/v-projects_logo.svg";
import DropDown from "../assets/dropdown.svg";
import PartnerSearchBar from "./partnerSearchBar";
import Sidebar from "./sidebar";
import { format } from 'date-fns';
import Dropdown from "./dropdown";


function Header() {
  const { getUserData } = useAuth();
  const user = getUserData();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeDropdown = () => {
    setDropdown(false);
  };

  const formattedBirthDate = user?.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '';

  return (
    <>
      <div className="fixed w-full bg-branco flex justify-between shadow-md py-5 z-50">
        <div className="flex items-center ml-8">
          <button onClick={toggleSidebar}>
            <img src={Menu} alt="Menu" />
          </button>
          <div className="ml-4">
            <Link to={user?.role === "SOCIO" ? "/home-socio" : "/"}>
              <img src={Logo} className="w-36 h-12" alt="Logo V-Projects" />
            </Link>
          </div>
        </div>
        {user?.role === "SOCIO" && (
          <div className="flex items-center">
            <PartnerSearchBar />
          </div>
        )}
        <div className="flex mr-10 items-center">
          <button className="mr-6">
            <img src={Sininho} alt="Sininho de notificações" />
          </button>
          <div className="h-14 border-l border-slate-200 mr-6"></div>
          <div className="mr-6">
            <Avatar>
              <AvatarImage src={user?.profilePhoto} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </div>
          <div className="relative">
            <button onClick={() => setDropdown(!dropdown)} className="-ml-4">
              <img className="h-4 w-4" src={DropDown} alt="Drop down" />
            </button>
            {dropdown && <Dropdown user={user!} formattedBirthDate={formattedBirthDate} closeDropdown={closeDropdown} />}
          </div>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Header;
