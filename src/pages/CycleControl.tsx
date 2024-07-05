import SubHeaderEqualization from "@/components/subHeaderCycleControl";
import TutorialPartner from "@/components/tutorialPartner";
import { CycleControlTable } from "@/components/cycleControlTable/data-table";
import { Payment, columns } from "@/components/cycleControlTable/columns";

const datatable: Payment[] = [
    {
      id: "m5gr84i9",
      name: "Marina da Silva Brito", 
      grade: 5, 
      sector: "Produto e Gestão de Projetos", 
      role: "UI/UX Design", 
      status: "Finalizado",
    },
    {
        id: "3u1reuv4",
        name: "Breno Gabriel", 
        grade: 10, 
        sector: "Executivos e Liderança", 
        role: "Desenvolvedor fullstack", 
        status: "Não iniciado",
    },
    {
        id: "3u1reuv4",
        name: "Breno Gabriel", 
        grade: 10, 
        sector: "Infraestrutura e Operações", 
        role: "Desenvolvedor fullstack", 
        status: "Não iniciado",
    },
    {
        id: "3u1reuv4",
        name: "Breno Gabriel", 
        grade: 10, 
        sector: "Ciência de Dados e Análise", 
        role: "Desenvolvedor fullstack", 
        status: "Não iniciado",
    }
  ]

function CycleControl() {
    return (
        <div className="h-full bg-azulBackground">
            <div className="h-36"> 
                <SubHeaderEqualization />
            </div>
            <TutorialPartner />
            <div className="mt-14 bg-white rounded-2xl shadow-md mx-16">
                <CycleControlTable columns={columns} data={datatable} />
            </div>
        </div>
    );
}

export default CycleControl;
