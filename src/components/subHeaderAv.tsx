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
            <button className="bg-[#f1f7ff] w-36 h-12 m-8 rounded-md text-roxoPrincipal text-sm font-semibold hover:bg-[#e7edf5]">Salvar Rascunho</button>
    </div>
    )
}

export default SubHeaderAv;