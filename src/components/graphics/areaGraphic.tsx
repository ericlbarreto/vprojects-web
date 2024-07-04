import { formatDate } from "@/common/formatDate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Cycle } from "@/interfaces/Cycle";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import api from "@/services/axiosConfig";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const cycle = payload[0].payload;
    return (
      <div className="bg-white border-azulBackground border-2 border-lg p-4">
        <p className="text-roxoPrincipal">{cycle.name}</p>
        <p className="text-preto">Início: {formatDate(cycle.startDate)}</p>
        <p className="text-preto">Fim: {formatDate(cycle.endDate)}</p>
        <p className="label">{`Nota final: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function AreaGraphic() {
  const [cycles, setCycles] = useState<Cycle[]>([]);

  useEffect(() => {
    const getCycles = async () => {
        try {
            const response = await api.get('/api/cycles');
            setCycles(response.data);
        } catch (error) {
            console.error('Erro ao buscar os colaboradores:', error);
        }
    };

    getCycles();
}, []);

  return (
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
          data={cycles}
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
          <XAxis dataKey="endDate" tickFormatter={formatDate} />
          <YAxis ticks={[1, 2, 3, 4, 5]} domain={[0, 5]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="linear"
            dataKey="finalGrade"
            stroke="#570EFF"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
