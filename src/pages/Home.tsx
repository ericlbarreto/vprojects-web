import StartButton from "@/components/StartButton";
import { columns } from "@/components/cycleTable/columns";
import { CycleTable } from "@/components/cycleTable/data-table";
import AreaGraphic from "@/components/graphics/areaGraphic";
import BarGraphic from "@/components/graphics/barGraphic";
import SuccesToast from "@/components/succesToast";
import { useAuth } from "@/contexts/authContext";
import api from "@/services/axiosConfig";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Assesment from "../assets/assesment.svg";
import Tutorial from "../assets/tutorial.svg";
import { formatDate } from "@/common/formatDate";
import { Cycle } from "@/interfaces/AvaliationCycle";

function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const { getUserData } = useAuth();
  const user = getUserData();

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const doneToast = queryParams.get("doneToast");

    if (doneToast) {
      toast.success("Enviado o ciclo de avaliações", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { background: "#E4FFE4", width: "320px" },
      });
    }
  }, [location.search]);

  useEffect(() => {
    const getCycles = async () => {
      try {
        const response = await api.get("/api/cycles");
        setCycles(response.data);
      } catch (error) {
        console.error("Erro ao buscar os colaboradores:", error);
      }
    };

    getCycles();
  }, []);

  console.log(cycles)

  const sentSelfAssessment = cycles.length > 0 && cycles[0]?.SelfAssessments?.some(
    (item) => item.id === user?.id
  );

  return (
    <div className="h-full bg-azulBackground">
      <div className="space-y-6 md:space-y-0 md:grid md:gap-x-6 md:grid-cols-8 md:p-10 sm:p-10 p-8">
        <div className="col-span-5 bg-white rounded-2xl shadow-md">
          <div className="grid gap-x-2 grid-cols-5 py-6 px-6">
            <div className="col-span-3 space-y-14">
              <p>
                <span className="font-extrabold text-[#2d2d2d]">
                  Boas vindas,
                </span>{" "}
                <span className="font-semibold text-[#2d2d2d]">
                  {user?.name}!
                </span>
              </p>
              {sentSelfAssessment ? (
                <>
                  <p className="text-justify text-textoCor">
                    O seu ciclo de avaliação com data de finalização <b>{cycles.length > 0 && formatDate(cycles[0].endDate)} </b>
                    foi enviado! A sua colaboração é essencial para o nosso
                    progresso contínuo.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-justify text-textoCor">
                    Você tem uma autoavaliação pendente que precisa ser
                    concluída até <b>{cycles.length > 0 && formatDate(cycles[0].endDate)}</b>! Inicie agora, sua
                    colaboração é essencial para o nosso progresso contínuo.
                  </p>
                </>
              )}

              <div>
                <a href="autoavaliacao">
                  <StartButton
                    className={
                      "bg-roxoPrincipal w-48 h-9 rounded-md text-white font-semibold hover:bg-[#6929fe]"
                    }
                  />
                </a>
              </div>
            </div>
            <div className="col-span-2 ml-12 flex justify-end">
              <img src={Assesment} className="w-64 h-64" alt="Assesment Icon" />
            </div>
          </div>
        </div>
        <div className="col-span-3 col-start-6 bg-white rounded-2xl shadow-md relative">
          <div className="grid gap-x-2 grid-cols-7">
            <div className="col-span-4 py-6 px-6 space-y-8">
              <p className="font-extrabold text-[#2d2d2d]">
                Tutorial da Plataforma
              </p>
              <p className="text-textoCor">
                Explore todas as funcionalidades e compreenda como elas podem
                aprimorar sua experiência.
              </p>
              <StartButton
                className={
                  "bg-[#f1f7ff] w-48 h-9 rounded-md text-roxoPrincipal font-semibold hover:bg-[#e7edf5]"
                }
              />
            </div>
            <div className="flex flex-col justify-center items-center col-span-3">
              <img
                src={Tutorial}
                className="w-60 h-60 absolute bottom-0 right-2 xl:w-72 xl:h-72"
                alt="Tutorial Icon"
              />
            </div>
          </div>
        </div>

        <div className="col-span-8">
          <h1 className="font-extrabold text-[#2D2D2D] text-2xl mb-2 mt-6">
            Ciclos de avaliação
          </h1>
        </div>
        <AreaGraphic />
        <BarGraphic userId={user?.id} />
        <div className="col-span-8">
          <h1 className="font-extrabold text-[#2D2D2D] text-2xl mb-2 mt-6">
            Histórico de Ciclos de Avaliações
          </h1>
        </div>
        <div className="col-span-8 bg-white rounded-2xl shadow-md relative h-[400px] mt-6">
          <CycleTable columns={columns} data={cycles} />
        </div>
      </div>
      <SuccesToast />
    </div>
  );
}

export default Home;
