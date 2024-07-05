import { formatDate } from "@/common/formatDate";
import StartButton from "@/components/StartButton";
import { columns } from "@/components/equalizationTable/columns";
import { EqualizationTable } from "@/components/equalizationTable/data-table";
import CircularProgressWithDot from "@/components/graphics/circleChart";
import MultipleBarGraphic from "@/components/graphics/multipleBarGraphic";
import { Cycle } from "@/interfaces/AvaliationCycle";
import { EqualizationCycle } from "@/interfaces/EqualizationCycle";
import api from "@/services/axiosConfig";
import { useEffect, useState } from "react";
import Assesment from "../assets/assesment.svg";
import Tutorial from "../assets/tutorial.svg";

function HomeSocio() {
  const [equalizationCycles, setEqualizationCycles] = useState<
    EqualizationCycle[]
  >([]);
  const [currentCycle, setCurrentCycle] = useState<Cycle>(() => ({} as Cycle));

  useEffect(() => {
    const getEqualizationAndCycles = async () => {
      try {
        const equalizationsResponse = await api.get(
          "/api/cycles-equalization/all"
        );
        const currentCycle = await api.get("/api/cycles/");
        setEqualizationCycles(equalizationsResponse.data.reverse());
        setCurrentCycle(currentCycle.data[1]);
      } catch (error) {
        console.error("Erro ao buscar os ciclos de equalização:", error);
      }
    };

    getEqualizationAndCycles();
  }, []);

  const hasPendingSelfAssessments =
    equalizationCycles.length > 0 &&
    currentCycle.SelfAssessments &&
    equalizationCycles[0].Equalizations.length <
      currentCycle.SelfAssessments.length;

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
                  Camila Fontes!
                </span>
              </p>
              {hasPendingSelfAssessments ? (
                <>
                  <p className="text-justify text-textoCor">
                    Você tem uma autoavaliação pendente que precisa ser
                    concluída até{" "}
                    <b>
                      {equalizationCycles.length > 0 &&
                        formatDate(equalizationCycles[0].endDate)}
                    </b>
                    ! Inicie agora, sua colaboração é essencial para o nosso
                    progresso contínuo.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-justify text-textoCor">
                    O seu ciclo de avaliação com data de finalização{" "}
                    <b>
                      {equalizationCycles.length > 0 &&
                        formatDate(equalizationCycles[0].endDate)}
                    </b>{" "}
                    foi enviado! A sua colaboração é essencial para o nosso
                    progresso contínuo.
                  </p>
                </>
              )}
              <div>
                <a href="controle-de-ciclo">
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
            <div className="col-span-4 py-6 px-6 space-y-11">
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
        <MultipleBarGraphic data={equalizationCycles} />
        <div className="flex flex-col col-span-3 bg-white rounded-2xl shadow-md relative p-6 h-[600px]">
          <div className="flex justify-left items-center mb-4">
            <div>
              <p className="text-cinza">Estatística</p>
              <h2 className="text-[#2D2D2D] font-bold">
                das equalizações já realizadas
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full text-roxoPrincipal">
            <CircularProgressWithDot
              value={
                equalizationCycles?.[0]?.Equalizations?.length &&
                currentCycle?.SelfAssessments?.length
                  ? equalizationCycles[0].Equalizations.length /
                    currentCycle.SelfAssessments.length * 100
                  : 0
              }
            />
          </div>
        </div>
        <div className="col-span-8">
          <h1 className="font-extrabold text-[#2D2D2D] text-2xl mb-2 mt-6">
            Histórico de Ciclos de Equalizações
          </h1>
        </div>
        <div className="col-span-8 bg-white rounded-2xl shadow-md relative h-[400px] mt-6">
          <EqualizationTable columns={columns} data={equalizationCycles} />
        </div>
      </div>
    </div>
  );
}

export default HomeSocio;
