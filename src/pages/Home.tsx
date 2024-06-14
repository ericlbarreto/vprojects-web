import StartButton from "@/components/StartButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Assesment from "../assets/assesment.svg";
import Tutorial from "../assets/tutorial.svg";
import { DataTable } from "@/components/table/data-table";
import { Payment, columns } from "@/components/table/columns";


const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
              <p className="text-justify text-textoCor">
                Você tem uma autoavaliação pendente que precisa ser concluída
                até <b>23/05/2024</b>! Inicie agora, sua colaboração é essencial
                para o nosso progresso contínuo.
              </p>
              <StartButton
                className={
                  "bg-roxoPrincipal w-48 h-9 rounded-md text-white font-semibold hover:bg-[#6929fe]"
                }
              />
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
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#570EFF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="linear"
                dataKey="uv"
                stroke="#570EFF"
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
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
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="pv"
                fill="#570EFF"
                activeBar={<Rectangle fill="#570EFF" stroke="#570EFF" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-8 bg-white rounded-2xl shadow-md relative h-[400px] mt-6">
          <DataTable columns={columns} data={datatable} />
        </div>
      </div>
    </div>
  );
}

export default Home;
