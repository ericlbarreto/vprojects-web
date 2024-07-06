import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Cycle } from "@/interfaces/Cycle";
// import { formatDate } from "date-fns";
import { formatDate } from "@/common/formatDate";
import api from "@/services/axiosConfig";
import FinishEqualization from "./finishEqualization";
import Done from "../assets/done.svg"



interface SubHeaderEqualizationProps{

    isSelfAval?: boolean
    setAtencao: (value: boolean) => void;
    atencao: boolean;
    // elementVisible: boolean; 
    // setElementVisible: (value: boolean) => void;
    currentCycle?: Cycle;
    funcaoSalvarOuFinalizar?: Function;

}

function SubHeaderEqualization({isSelfAval, funcaoSalvarOuFinalizar, setAtencao, atencao, currentCycle}:SubHeaderEqualizationProps){

    const location = useLocation();
    const currentPath = location.pathname;
    const [finishStatus, setFinishStatus] = useState(false)
    const [elementVisible, setElementVisible] = useState(false); 

    const [colabData, setColabData] = useState<{ [key: string]: string }>({
        "name": "",
        "sector": "",
        "position": "",
        "profilePhoto":""
    })

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const collaboratorId = queryParams.get("colabId");

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
            } catch (error) {
                console.error("Erro ao buscar os dados do colaborador ou equalização:", error);
            }
        };

        if (collaboratorId) {
            fetchData();
        }
    }, [location.search]);


    const handleEncerrarEqualizacao = async () => {
        try {
            if (!currentCycle?.id) {
                console.error("ID do ciclo não encontrado.");
                return;
            }

            const response = await api.patch(`/api/cycles-equalization/${currentCycle.id}`, {
                status: true, 
            });

            console.log("Status do ciclo atualizado:", response.data);

            setFinishStatus(true);
            setElementVisible(true);
        } catch (error) {
            console.error("Erro ao encerrar a equalização:", error);
        }
    };

    const handleSetAtencao = (value: boolean) => {
        setAtencao(value);
      };


    return(
        <div className="fixed w-screen bg-[#FBFCFF] flex justify-between px-10 z-30 pt-4 pb-6">
            {/* lado direito*/}
            <div>
                <Breadcrumb>
                    <BreadcrumbList>
                    {currentPath == "/equalizacao" ? (
                        <BreadcrumbItem>
                           <button onClick={() => handleSetAtencao(true)}><BreadcrumbLink className="underline">Menu Principal</BreadcrumbLink></button>
                        </BreadcrumbItem>
                    ):(
                        <BreadcrumbItem>
                            <a href="/home-socio"><button><BreadcrumbLink className="underline">Menu Principal</BreadcrumbLink></button></a>
                        </BreadcrumbItem>
                    ) }

                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            {currentPath == "/controle-de-ciclo" && (
                                <BreadcrumbPage className='text-[#50556b] font-bold'>Controle de ciclos</BreadcrumbPage>
                            ) }

                            {(currentPath == "/equalizacao" && isSelfAval == true) && (
                                <BreadcrumbPage className='text-[#50556b] font-bold'>Autoavaliação</BreadcrumbPage>
                            )}

                            {(currentPath == "/equalizacao" && isSelfAval == false) && (
                                <button onClick={() => setAtencao(true)}><BreadcrumbLink className='text-[#50556b] underline'>Autoavaliação</BreadcrumbLink></button>
                            )}


                        </BreadcrumbItem>

                        {(currentPath == "/equalizacao" && isSelfAval == false) && (
                                <BreadcrumbItem>
                                    <BreadcrumbSeparator/>
                                    <BreadcrumbPage className='text-[#50556b] font-bold'>Avaliação 360</BreadcrumbPage>
                                </BreadcrumbItem>

                            ) }
                    </BreadcrumbList>
                </Breadcrumb>

                {(currentPath == "/controle-de-ciclo") && (
                    <div className="mt-4">
                        <p className='font-extrabold text-2xl'>Controle de ciclos de avaliações</p>
                        {currentCycle?.endDate ? (
                            <p className="mt-4">Data de finalização: {formatDate(currentCycle.endDate)}</p>
                        ) : (
                            <p className="mt-4">Data de finalização: Não disponível</p>
                        )}
                    </div>
                )}

                {(currentPath == "/equalizacao" && isSelfAval == true) && (
                    <>
                        <div className="mt-4 mb-4">
                            <p className='font-extrabold text-2xl'>Autoavaliação</p>
                        </div>
                        <div className="pb-2 ">
                            <p className="font-semibold pb-1 text-base">Informações pessoais:</p>
                            <div className="flex gap-x-2">
                            <Avatar>
                                <AvatarImage src={colabData.profilePhoto} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>  
                                <div className="flex gap-x-4 pt-2">
                                    <p><span className="font-semibold">Colaborador:</span> <span className="font-cinzaClaro">{colabData.name}</span></p>
                                    <p><span className="font-semibold">Setor:</span> <span className="font-cinzaClaro">{colabData.sector}</span></p>
                                    <p><span className="font-semibold">Cargo:</span> <span className="font-cinzaClaro">{colabData.position}</span></p>    
                                </div>            
                            </div>
                        </div>
                    </>
                )}

                {(currentPath == "/equalizacao" && isSelfAval == false) && (
                                    <>
                                        <div className="mt-4 mb-4">
                                            <p className='font-extrabold text-2xl'>Avaliação 360</p>
                                        </div>
                                        <div className="pb-2 ">
                                            <p className="font-semibold pb-1 text-base">Informações pessoais:</p>
                                            <div className="flex gap-x-2">
                                            <Avatar>
                                                <AvatarImage src={colabData.profilePhoto} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>  
                                                <div className="flex gap-x-4 pt-2">
                                                    <p><span className="font-semibold">Colaborador:</span> <span className="font-cinzaClaro">{colabData.name}</span></p>
                                                    <p><span className="font-semibold">Setor:</span> <span className="font-cinzaClaro">{colabData.sector}</span></p>
                                                    <p><span className="font-semibold">Cargo:</span> <span className="font-cinzaClaro">{colabData.position}</span></p>    
                                                </div>            
                                            </div>
                                        </div>
                                    </>
                                )}
              

            </div>
            {/* lado direito*/}

            {(currentPath == "/controle-de-ciclo") && (
                <div className="flex flex-col justify-center gap-y-2.5 mt-6">
                <button onClick={handleEncerrarEqualizacao} className="px-0 py-3 gap-y-2.5 rounded-xl bg-roxoPrincipal text-white w-60 ml-auto">Encerrar equalização</button>
                <p className="text-cinzaAlt">Informações são salvas automaticamente</p>
            </div>
            )}

            {/* {elementVisible && (

                <div className="flex-col z-50 fixed bg-branco w-80 h-52 p-4 border-2 shadow rounded-sm">
                    <div className="flex justify-center mb-2"><img className="size-12" src={Done} alt="Atenção" /></div>
                    <div className="text-black text-sm justify-center font-semibold flex mb-2">Concluído!</div>
                    <div className="text-[#727272] text-xs flex justify-center text-center mb-5">Ao clicar em "Encerrar equalização" o ciclo aberto de equalizações será finalizado.</div>
                    <div className="flex justify-center space-x-4">
                        <button onClick={()=>setElementVisible(false)} className="bg-[#EAEAEA] w-28 h-9 text-xs rounded-md text-black font-medium">Cancelar</button>
                        <a href={"/home-socio"}><button onClick={()=>setElementVisible(false)} className="bg-roxoPrincipal w-28 h-9 text-xs rounded-md text-branco">Continuar</button></a>
                    </div>
                </div>

            )} */}

            {(currentPath == "/equalizacao") && (
                <div className="flex flex-row justify-center gap-y-2.5 gap-x-6 mt-6 ">
                    <button onClick={()=>funcaoSalvarOuFinalizar!(true)} className="px-6 py-3 gap-y-2.5 rounded-xl bg-customBlue text-roxoPrincipal w- h-11 ml-auto">Salvar rascunho</button>
                    <button onClick={()=>funcaoSalvarOuFinalizar!(false)} className="px-6 py-3 gap-y-2.5 rounded-xl  bg-roxoPrincipal text-white w- h-11 ml-auto">Concluir equalização</button>
                </div>
            )}

        </div>
    );

}

export default SubHeaderEqualization
