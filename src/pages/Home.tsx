import StartButton from "@/components/StartButton";
import AreaGraphic from "@/components/graphics/areaGraphic";
import BarGraphic from "@/components/graphics/barGraphic";
import { Payment, columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-select";
import Assesment from "../assets/assesment.svg";
import Tutorial from "../assets/tutorial.svg";
import { useAuth } from "@/contexts/authContext";

const datatable: Payment[] = [
  {
    id: "m5gr84i9",
    startDate: "2021-10-10",
    endDate: "2021-10-10",
    status: "em andamento",
    grade: 2,
  },
  {
    id: "3u1reuv4",
    startDate: "2021-10-10",
    endDate: "2021-10-10",
    status: "em andamento",
    grade: 3,
  },
  {
    id: "derv1ws0",
    startDate: "2021-10-10",
    endDate: "2021-10-10",
    status: "finalizado",
    grade: 2,
  },
  {
    id: "5kma53ae",
    startDate: "2021-10-10",
    endDate: "2021-10-10",
    status: "em andamento",
    grade: 3,
  },
  {
    id: "bhqecj4p",
    startDate: "2021-10-10",
    endDate: "2021-10-10",
    status: "finalizado",
    grade: 5,
  },
]

function Home() {
  const { getUserData } = useAuth();
  const user = getUserData();

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
              <p className="text-justify text-textoCor">
                Você tem uma autoavaliação pendente que precisa ser concluída
                até <b>23/05/2024</b>! Inicie agora, sua colaboração é essencial
                para o nosso progresso contínuo.
              </p>
              <div><a href="autoavaliacao"><StartButton
                className={
                  "bg-roxoPrincipal w-48 h-9 rounded-md text-white font-semibold hover:bg-[#6929fe]"
                }
              /></a></div>
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
        <div className="col-span-4 bg-white rounded-2xl shadow-md relative p-6 h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-cinza">Evolução</p>
              <h2 className="text-[#2D2D2D] font-bold">nota final</h2>
            </div>
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue
                  placeholder="Ano"
                  className="text-roxoPrincipal bg-azulBackground"
                />
              </SelectTrigger>
              <SelectContent className="bg-azulBackground">
                <SelectItem value="2024" className="text-roxoPrincipal">
                  2024
                </SelectItem>
                <SelectItem value="2023" className="text-roxoPrincipal">
                  2023
                </SelectItem>
                <SelectItem value="2022 " className="text-roxoPrincipal">
                  2022
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AreaGraphic />
        </div>
        <div className="col-span-4 bg-white rounded-2xl shadow-md relative p-6 h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-cinza">Notas</p>
              <h2 className="text-[#2D2D2D] font-bold">por critérios</h2>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue
                    placeholder="Ano"
                    className="text-roxoPrincipal bg-azulBackground"
                  />
                </SelectTrigger>
                <SelectContent className="bg-azulBackground">
                  <SelectItem value="2024" className="text-roxoPrincipal">
                    2024
                  </SelectItem>
                  <SelectItem value="2023" className="text-roxoPrincipal">
                    2023
                  </SelectItem>
                  <SelectItem value="2022 " className="text-roxoPrincipal">
                    2022
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue
                    placeholder="Critérios"
                    className="text-roxoPrincipal bg-azulBackground"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Comportamentais</SelectLabel>
                    <SelectItem value="2024" className="text-roxoPrincipal">
                      Sentimento de Dono
                    </SelectItem>
                    <SelectItem value="2023" className="text-roxoPrincipal">
                      Resiliência nas Adversidades
                    </SelectItem>
                    <SelectItem value="2022 " className="text-roxoPrincipal">
                      Organização no Trabalho
                    </SelectItem>
                    <SelectItem value="2022 " className="text-roxoPrincipal">
                      Capacidade de Aprender
                    </SelectItem>
                    <SelectItem value="2022 " className="text-roxoPrincipal">
                      Ser “Team Player”
                    </SelectItem>
                  </SelectGroup>
                  <Separator className="bg-cinza border-[0.7px]"/>
                  <SelectGroup>
                    <SelectLabel>Execução</SelectLabel>
                    <SelectItem value="2024" className="text-roxoPrincipal">
                      Entregar com Qualidade
                    </SelectItem>
                    <SelectItem value="2023" className="text-roxoPrincipal">
                      Atender aos Prazos
                    </SelectItem>
                    <SelectItem value="2022 " className="text-roxoPrincipal">
                      Fazer Mais com Menos
                    </SelectItem>
                    <SelectItem value="2022 " className="text-roxoPrincipal">
                      Pensar Fora da Caixa
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <BarGraphic />  
        </div>
        <div className="col-span-8">
          <h1 className="font-extrabold text-[#2D2D2D] text-2xl mb-2 mt-6">
            Histórico de Ciclos de Avaliações
          </h1>
        </div>
        <div className="col-span-8 bg-white rounded-2xl shadow-md relative h-[400px] mt-6">
          <DataTable columns={columns} data={datatable} />
        </div>
      </div>
    </div>
  );
}

export default Home;
