import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

import SalvarRascunho from "../assets/salvarRascunho.svg"
import Stepper from "./steps";


function SubHeaderAv() {
    return (
        <div className="fixed z-10 w-screen bg-[#FBFCFF] h-32 flex justify-between">
            <div className="m-4 ml-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="underline" href="/">Menu Principal</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Autoavaliação</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

                <p className="font-bold pt-2">Autoavaliação</p>
            </div>

            <div className="m-8"><Stepper/></div>
            <button className="m-8 h-12 w-36"> <img  src={SalvarRascunho} alt="Salvar rascunho" /></button>
    </div>
    )
}

export default SubHeaderAv;