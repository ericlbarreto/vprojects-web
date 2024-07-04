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

interface Equalization {
    id: number;
    status: string;
}

interface Address {
    district: string;
    city: string;
}

interface Collaborator {
    id: number;
    name: string;
    email: string;
    role: string;
    position: string;
    sector: string
    address: Address;
}

const mockCollaborator = {
    id: 1,
    name: "Catarina Leite Barros",
    email: "maria.silva@example.com",
    role: "UI/UX Designer",
    position: "UI/UX Designer",
    sector: "Executivos e Liderança",
    address: {
        district: "Centro",
        city: "São Paulo"
    }
};

const mockEqualization = {
    id: 1,
    status: "Finalizado",
};

function ControleColaborador() {
    const [colaborador, setColaborador] = useState<Collaborator | null>(mockCollaborator);
    const [equalization, setEqualization] = useState<Equalization | null>(mockEqualization);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollaborator = async () => {
            try {

                setTimeout(() => {
                    setColaborador(mockCollaborator);
                    setEqualization(mockEqualization);
                }, 1000);
            } catch (error) {
                if (error instanceof Error) {
                    setError('Erro ao buscar colaborador: ' + error.message);
                } else {
                    setError('Erro desconhecido');
                }
            }
        };

        fetchCollaborator();
    }, []);


    if (error) {
        return <p>{error}</p>;
    }

    if (!colaborador || !equalization) {
        return <p>No data available</p>;
    }

    return (
        <><div className="sm:p-10 p-16">
            <div className="col-start-6 col-span-8 bg-white rounded-2xl shadow-md relative flex items-center p-6">
                <Avatar className="h-24 w-24 ml-4">
                    <AvatarImage src="https://github.com/shadcn.png" className="h-24 w-24" />
                    <AvatarFallback>{colaborador.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-6">
                    <p className="font-extrabold text-[#2d2d2d] text-2xl">
                        {colaborador.name}
                    </p>
                    <div className="text-textoCor text-sm space-y-1">
                        <p>Cargo: {colaborador.position}</p>
                        <p>Setor: {colaborador.sector}</p>
                        <p>Email: {colaborador.email}</p>
                    </div>
                </div>
                <div className="absolute top-8 right-12 text-textoCor text-sm">
                    <p className="mb-2">Equalização</p>
                    <p className="bg-green-100 text-green-600 px-2 py-1 rounded">{equalization.status}</p>
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
