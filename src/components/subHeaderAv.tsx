import { useLocation } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SalvarRascunho from "../assets/salvarRascunho.svg";
import Stepper from "./steps";
import { useState } from "react";
import XClose from "../assets/xclose.svg"
import Check from "../assets/check.svg"


function SubHeaderAv() {
    const [salvarRascunho, setSalvarRascunho] = useState(false)
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="fixed w-screen bg-[#FBFCFF] h-32 flex justify-between px-4 z-40">
            <div className="m-4 ml-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="underline" href="/">Menu Principal</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator  />
                        <BreadcrumbItem>
                            {currentPath === '/autoavaliacao' ? (
                                <BreadcrumbPage className='text-[#50556b] font-bold'>Autoavaliação</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink className="underline" href="/autoavaliacao">Autoavaliação</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {currentPath === '/autoavaliacao/avaliacao-360' && (
                            <>
                                <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className='text-[#50556b] font-bold'>Avaliação 360</BreadcrumbPage>
                                    </BreadcrumbItem>
                            </>
                        )}
                        </BreadcrumbList>
                    </Breadcrumb>

                {currentPath === '/autoavaliacao' ? (
                    <p className="font-bold pt-2 text-2xl font-extrabold">Autoavaliação</p>
                ) : (
                    <p className="font-bold pt-2 text-2xl font-extrabold">Avaliação 360</p>
                )}
            </div>

            <div className="m-8"><Stepper /></div>
            <div className="">
                <button onClick={() => setSalvarRascunho(true)} className="bg-[#f1f7ff] w-36 h-12 mt-8 mr-8 ml-8 rounded-md text-roxoPrincipal text-sm font-semibold hover:bg-[#e7edf5]">Salvar Rascunho</button>
                {salvarRascunho ?
                        <div className="absolute w-44 h-12 rounded-md shadow border flex bg-[#E4FFE4] text-xs"><img className="size-6" src={Check} alt="Check" />
                            Informações salvas com sucesso
                            <button onClick={() => setSalvarRascunho(false)}><img src={XClose} alt="Fechar" /></button>

                        </div>: ""}
            </div>

        </div>
    )
}

export default SubHeaderAv;
