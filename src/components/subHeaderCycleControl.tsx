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

}

function SubHeaderEqualization({isSelfAval}:SubHeaderEqualizationProps){

    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <div className="fixed w-screen bg-[#FBFCFF] h-36 flex justify-between px-10 z-30 pt-4 pb-6">
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

                            {(currentPath == "/equalizacao" && isSelfAval == true) ? (
                                <BreadcrumbPage className='text-[#50556b] font-bold'>Autoavaliação</BreadcrumbPage>
                            ): (
                                <BreadcrumbLink className="underline">Autoavaliação</BreadcrumbLink>
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
                <div className="mt-4">
                    <p className='font-extrabold text-2xl'>Controle de ciclos de avaliações</p>
                    <p className="mt-4">Data de finalização:  15/07/2024</p>
                </div>

            </div>
            {/* lado direito*/}
            <div className="flex flex-col justify-center gap-y-2.5 mt-6">
                <button className="px-0 py-3 gap-y-2.5 rounded-xl bg-roxoPrincipal text-white w-60 ml-auto">Encerrar equalização</button>
                <p className="text-cinzaAlt">Informações são salvas automaticamente</p>
            </div>
        </div>
    );

}

export default SubHeaderEqualization
