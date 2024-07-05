import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

interface SubHeaderEqualizationProps{

    isSelfAval?: boolean
    funcaoSalvarOuFinalizar?: Function;

}

function SubHeaderEqualization({isSelfAval, funcaoSalvarOuFinalizar}:SubHeaderEqualizationProps){

    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <div className="fixed w-screen bg-[#FBFCFF] flex justify-between px-10 z-30 pt-4 pb-6">
            {/* lado direito*/}
            <div>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="underline">Menu Principal</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            {currentPath == "/controle-de-ciclo" && (
                                <BreadcrumbPage className='text-[#50556b] font-bold'>Controle de ciclos</BreadcrumbPage>
                            ) }

                            {(currentPath == "/equalizacao" && isSelfAval == true) && (
                                <BreadcrumbPage className='text-[#50556b] font-bold'>Autoavaliação</BreadcrumbPage>
                            )}

                            {(currentPath == "/equalizacao" && isSelfAval == false) && (
                                                            <BreadcrumbLink className='text-[#50556b] underline'>Autoavaliação</BreadcrumbLink>
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
                        <p className="mt-4">Data de finalização:  15/07/2024</p>
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
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>  
                                <div className="flex gap-x-4 pt-2">
                                    <p><span className="font-semibold">Colaborador:</span> <span className="font-cinzaClaro">Marina da Silva Brito</span></p>
                                    <p><span className="font-semibold">Setor:</span> <span className="font-cinzaClaro">design</span></p>
                                    <p><span className="font-semibold">Cargo:</span> <span className="font-cinzaClaro">UI/UX Design</span></p>    
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
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>  
                                                <div className="flex gap-x-4 pt-2">
                                                    <p><span className="font-semibold">Colaborador:</span> <span className="font-cinzaClaro">Marina da Silva Brito</span></p>
                                                    <p><span className="font-semibold">Setor:</span> <span className="font-cinzaClaro">design</span></p>
                                                    <p><span className="font-semibold">Cargo:</span> <span className="font-cinzaClaro">UI/UX Design</span></p>    
                                                </div>            
                                            </div>
                                        </div>
                                    </>
                                )}
              

            </div>
            {/* lado direito*/}

            {(currentPath == "/controle-de-ciclo") && (
                <div className="flex flex-col justify-center gap-y-2.5 mt-6">
                <button className="px-0 py-3 gap-y-2.5 rounded-xl bg-roxoPrincipal text-white w-60 ml-auto">Encerrar equalização</button>
                <p className="text-cinzaAlt">Informações são salvas automaticamente</p>
            </div>
            )}

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
