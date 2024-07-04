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
import { useEffect, useState } from "react";
import {
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
import api from "@/services/axiosConfig";
import { formatDate } from "@/common/formatDate";

interface barGraphicProps {
  userId?: number;
}

export default function BarGraphic({ userId }: barGraphicProps) {
  const [selfAssessment, setSelfAssessment] = useState<[]>([]);

  useEffect(() => {
    const getSelfAssessments = async () => {
        try {
            const response = await api.get(`/api/self-assesment/user/all/${userId}`);
            setSelfAssessment(response.data);
        } catch (error) {
            console.error('Erro ao buscar os colaboradores:', error);
        }
    };

    getSelfAssessments();
}, []);

  return (
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
              <Separator className="bg-cinza border-[0.7px]" />
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
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={400}
          data={selfAssessment}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis ticks={[1, 2, 3, 4, 5]} domain={[0, 5]}/>
          <Tooltip />
          <Legend />
          <Bar
            dataKey="meanGrade"
            fill="#570EFF"
            maxBarSize={100}
            
            activeBar={<Rectangle fill="#570EFF" stroke="#570EFF" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
