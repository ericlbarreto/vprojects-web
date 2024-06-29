import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function SubHeaderCycleControl() {

    return(
        <div className="fixed w-screen bg-[#FBFCFF] h-36 flex justify-between px-10 z-30 pt-4 pb-6">
            <div>Lado esquerdo</div>
            <div className="flex flex-col justify-center gap-y-2.5 mt-6">
                <button className="px-0 py-3 gap-y-2.5 rounded-xl bg-roxoPrincipal text-white w-60 ml-auto">Encerrar equalização</button>
                <p className="text-cinzaAlt">Informações são salvas automaticamente</p>
            </div>
        </div>
    );

}

export default SubHeaderCycleControl
