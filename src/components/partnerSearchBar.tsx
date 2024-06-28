import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { useState } from "react";
  import { FaSearch } from "react-icons/fa";
  import { Input } from "./ui/input";
  import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
  
  const PartnerSearchBar = () => {
    const [search, setSearch] = useState("");
    const colaboradores = [
      { name: "Catarina Leite", role: "UI/UX Designer", image: "url_to_image" },
      { name: "Marina Barros", role: "Product Designer", image: "url_to_image" },
      {
        name: "Marina Maria Leite",
        role: "Desenvolvedora",
        image: "url_to_image",
      },
    ];
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    };
  
    const handleItemClick = (colaborador) => {
      console.log(colaborador);
    };
  
    const filteredColaboradores = search
      ? colaboradores.filter((colaborador) =>
          colaborador.name.toLowerCase().includes(search.toLowerCase())
        )
      : colaboradores;
  
    return (
      <DropdownMenu>
        <div className="relative">
          <div className="flex items-center relative">
            <DropdownMenuTrigger asChild>
              <Input
                type="text"
                className="bg-azulBackground border-none w-[512px] focus:outline-none focus:border-roxoPrincipal"
                placeholder="Pesquise o nome do colaborador"
                onChange={handleInputChange}
                value={search}
              />
            </DropdownMenuTrigger>
            <FaSearch className="text-cinza absolute right-4 cursor-pointer" />
          </div>
  
          <DropdownMenuContent className="absolute mt-2 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            {filteredColaboradores.map((colaborador, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer gap-4"
                onClick={() => handleItemClick(colaborador)}
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{colaborador.name}</div>
                  <div className="text-sm text-gray-500">{colaborador.role}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    );
  };
  
  export default PartnerSearchBar;
  