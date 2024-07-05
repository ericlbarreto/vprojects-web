import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AreaGraphic from "@/components/graphics/areaGraphic";
import BarGraphic from "@/components/graphics/barGraphic";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-select";
import { EqualizationTable } from '@/components/equalizationTable/data-table';
import { Payment, columns } from "@/components/equalizationTable/columns";
import api from '@/services/axiosConfig';
import { useLocation } from "react-router-dom";
import { findPositionOfBar } from 'recharts/types/util/ChartUtils';

const datatable: Payment[] = [
    {
        id: "m5gr84i9",
        startDate: "2021-10-10",
        endDate: "2021-10-10",
        status: "em andamento"
    },
    {
        id: "3u1reuv4",
        startDate: "2021-10-10",
        endDate: "2021-10-10",
        status: "em andamento"
    },
    {
        id: "derv1ws0",
        startDate: "2021-10-10",
        endDate: "2021-10-10",
        status: "finalizado"
    },
    {
        id: "5kma53ae",
        startDate: "2021-10-10",
        endDate: "2021-10-10",
        status: "em andamento"
    },
    {
        id: "bhqecj4p",
        startDate: "2021-10-10",
        endDate: "2021-10-10",
        status: "finalizado"
    },
]


function ControleColaborador() {
    const location = useLocation();
    const [colabData, setColabData] = useState<{ [key: string]: string }>({
        "name": "",
        "email": "",
        "sector": "",
        "position": ""
    })
    const [equalization, setEqualization] = useState<{ [key: string]: string }>({
        "status": ""
    })

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const collaboratorId = queryParams.get("id");

        const fetchData = async () => {
            try {
                const collaboratorResponse = await api.get(`/api/user/${collaboratorId}`);
                setColabData({
                    name: collaboratorResponse.data.name,
                    email: collaboratorResponse.data.email,
                    sector: collaboratorResponse.data.sector,
                    position: collaboratorResponse.data.position,
                    profilePhoto: collaboratorResponse.data.profilePhoto
                });

                const equalizationResponse = (await api.get(`/api/equalization/${collaboratorId}/${1}`)).data;//colocar id do colaborador
                if (equalizationResponse === 0) {
                    setEqualization({ status: "Não iniciado" });
                }
                else {
                    if (equalizationResponse){
                        setEqualization({ status: "Finalizado" });
                    }
                    else{
                        setEqualization({ status: "Em andamento" });
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar os dados do colaborador ou equalização:", error);
            }
        };

        if (collaboratorId) {
            fetchData();
        }
    }, [location.search]);


    return (
        <><div className="sm:p-10 p-16">
            <div className="col-start-6 col-span-8 bg-white rounded-2xl shadow-md relative flex items-center p-6">
                <Avatar className="h-24 w-24 ml-4">
                    <AvatarImage src={colabData.profilePhoto} className="h-24 w-24" />
                    <AvatarFallback>{colabData.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-6">
                    <p className="font-extrabold text-[#2d2d2d] text-2xl">
                        {colabData.name}
                    </p>
                    <div className="text-textoCor text-sm space-y-1">
                        <p>Cargo: {colabData.position}</p>
                        <p>Setor: {colabData.sector}</p>
                        <p>Email: {colabData.email}</p>
                    </div>
                </div>
                <div className="absolute top-8 right-12 text-textoCor text-sm">
                    <p className="mb-2">Equalização</p>
                    <p className={`${equalization.status === "Finalizado"? "bg-green-100 text-green-600" : equalization.status === "Em andamento"? "bg-[#FEFFC2] text-[#9B7900]" : "bg-[#F6EBE3] text-[#A71111]"} px-2 py-1 rounded`}>{equalization.status}</p>
                </div>
            </div>
        </div>

            <div className="h-full bg-azulBackground">
                <div className="space-y-4 md:space-y-0 md:grid md:gap-x-6 md:grid-cols-2 md:p-8 sm:p-8 p-8">
                    <div className="bg-white rounded-2xl shadow-md relative p-6 max-w-full md:max-w-[700px]  mx-2">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-cinza">Evolução</p>
                                <h2 className="text-[#2D2D2D] font-bold">nota final</h2>
                            </div>
                            <Select>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue
                                        placeholder="Ano"
                                        className="text-roxoPrincipal bg-azulBackground" />
                                </SelectTrigger>
                                <SelectContent className="bg-azulBackground">
                                    <SelectItem value="2024" className="text-roxoPrincipal">
                                        2024
                                    </SelectItem>
                                    <SelectItem value="2023" className="text-roxoPrincipal">
                                        2023
                                    </SelectItem>
                                    <SelectItem value="2022 " className="text-roxoPrincipal">
                                        2022
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <AreaGraphic />
                    </div>
                    <div className="bg-white rounded-2xl shadow-md relative p-6  max-w-full md:max-w-[700px]  mx-2">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-cinza">Notas</p>
                                <h2 className="text-[#2D2D2D] font-bold">por critérios</h2>
                            </div>
                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue
                                            placeholder="Ano"
                                            className="text-roxoPrincipal bg-azulBackground" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-azulBackground">
                                        <SelectItem value="2024" className="text-roxoPrincipal">
                                            2024
                                        </SelectItem>
                                        <SelectItem value="2023" className="text-roxoPrincipal">
                                            2023
                                        </SelectItem>
                                        <SelectItem value="2022 " className="text-roxoPrincipal">
                                            2022
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue
                                            placeholder="Critérios"
                                            className="text-roxoPrincipal bg-azulBackground" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Comportamentais</SelectLabel>
                                            <SelectItem value="sentimento-de-dono" className="text-roxoPrincipal">
                                                Sentimento de Dono
                                            </SelectItem>
                                            <SelectItem value="resiliencia-nas-adversidades" className="text-roxoPrincipal">
                                                Resiliência nas Adversidades
                                            </SelectItem>
                                            <SelectItem value="organizacao-no-trabalho" className="text-roxoPrincipal">
                                                Organização no Trabalho
                                            </SelectItem>
                                            <SelectItem value="capacidade-de-aprender" className="text-roxoPrincipal">
                                                Capacidade de Aprender
                                            </SelectItem>
                                            <SelectItem value="team-player" className="text-roxoPrincipal">
                                                Ser “Team Player”
                                            </SelectItem>
                                        </SelectGroup>
                                        <Separator className="bg-cinza border-[0.7px]" />
                                        <SelectGroup>
                                            <SelectLabel>Execução</SelectLabel>
                                            <SelectItem value="entregar-com-qualidade" className="text-roxoPrincipal">
                                                Entregar com Qualidade
                                            </SelectItem>
                                            <SelectItem value="atender-aos-prazos" className="text-roxoPrincipal">
                                                Atender aos Prazos
                                            </SelectItem>
                                            <SelectItem value="fazer-mais-com-menos" className="text-roxoPrincipal">
                                                Fazer Mais com Menos
                                            </SelectItem>
                                            <SelectItem value="pensar-fora-da-caixa" className="text-roxoPrincipal">
                                                Pensar Fora da Caixa
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <BarGraphic />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full bg-azulBackground">
                <div className="space-y-4 md:space-y-0 md:grid md:gap-x-6 md:p-8 sm:p-8 p-8">
                    <div className="col-span-8 mx-2">
                        <h1 className="font-extrabold text-[#2D2D2D] text-2xl mt-6">
                            Histórico de Ciclos de Equalizações
                        </h1>
                    </div>
                    <div className="col-span-8 bg-white rounded-2xl shadow-md relative h-[400px] mt-6 mx-2">
                        <EqualizationTable columns={columns} data={datatable} />
                    </div>
                </div>
            </div >

        </>
    );
}

export default ControleColaborador;
