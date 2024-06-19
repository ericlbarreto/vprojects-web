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

function SubHeaderAv() {
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
                        <BreadcrumbSeparator />
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

            <Stepper />
            <button className="m-8 h-12 w-36"> <img src={SalvarRascunho} alt="Salvar rascunho" /></button>
        </div>
    );
}

export default SubHeaderAv;
