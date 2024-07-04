import { formatDate } from "@/common/formatDate";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/axiosConfig";
import { Separator } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface SelfAssessmentScore {
  id: number;
  selfAssessmentId: number;
  criterionId: number;
  grade: number;
  justification: string;
}

interface SelfAssessment {
  id: number;
  userId: number;
  cycleId: number;
  status: boolean;
  date: string;
  meanGrade: number;
  cycle: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: boolean;
    finalGrade: number;
  };
  SelfAssessmentScores: SelfAssessmentScore[];
}

interface BarGraphicProps {
  userId?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const selfAssessment = payload[0].payload;
    return (
      <div className="bg-white border-azulBackground border-2 border-lg p-4">
        <p className="text-roxoPrincipal">{selfAssessment.cycle.name}</p>
        <p className="text-preto">Data: {formatDate(selfAssessment.date)}</p>
        <p className="label">{`Nota final: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export default function BarGraphic({ userId }: BarGraphicProps) {
  const [selfAssessment, setSelfAssessment] = useState<SelfAssessment[]>([]);
  const [filteredData, setFilteredData] = useState<SelfAssessment[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCriterion, setSelectedCriterion] = useState<string>('empty');

  useEffect(() => {
    const getSelfAssessments = async () => {
      try {
        const response = await api.get(`/api/self-assesment/user/all/${userId}`);
        setSelfAssessment(response.data);
      } catch (error) {
        console.error('Erro ao buscar os autoavaliações:', error);
      }
    };
    getSelfAssessments();
  }, [userId]);

  useEffect(() => {
    const filterData = () => {
      let data = selfAssessment;

      if (selectedYear && selectedYear !== 'Todos os anos') {
        data = data.filter(item => new Date(item.date).getFullYear() === parseInt(selectedYear));
      }

      if (selectedCriterion !== 'empty') {
        data = data.map(item => ({
          ...item,
          SelfAssessmentScores: item.SelfAssessmentScores.filter(score => score.criterionId === parseInt(selectedCriterion))
        })).filter(item => item.SelfAssessmentScores.length > 0);
      }

      setFilteredData(data);
    };

    filterData();
  }, [selfAssessment, selectedYear, selectedCriterion]);

  return (
    <div className="col-span-4 bg-white rounded-2xl shadow-md relative p-6 h-[600px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-cinza">Notas</p>
          <h2 className="text-[#2D2D2D] font-bold">por critérios</h2>
        </div>
        <div className="flex gap-2">
          <Select onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue
                placeholder="Ano"
                className="text-roxoPrincipal bg-azulBackground"
              />
            </SelectTrigger>
            <SelectContent className="bg-azulBackground">
              <SelectItem value="Todos os anos" className="text-roxoPrincipal">
                Todos
              </SelectItem>
              <SelectItem value="2024" className="text-roxoPrincipal">
                2024
              </SelectItem>
              <SelectItem value="2023" className="text-roxoPrincipal">
                2023
              </SelectItem>
              <SelectItem value="2022" className="text-roxoPrincipal">
                2022
              </SelectItem>
              <SelectItem value="2021" className="text-roxoPrincipal">
                2021
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setSelectedCriterion(value || '')}>
            <SelectTrigger className="w-[120px]">
              <SelectValue
                placeholder="Critérios"
                className="text-roxoPrincipal bg-azulBackground"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="empty" className="text-roxoPrincipal">
                Todos
              </SelectItem>
              <SelectGroup>
                <SelectLabel>Comportamentais</SelectLabel>
                <SelectItem value="1" className="text-roxoPrincipal">
                  Sentimento de Dono
                </SelectItem>
                <SelectItem value="2" className="text-roxoPrincipal">
                  Resiliência nas Adversidades
                </SelectItem>
                <SelectItem value="3" className="text-roxoPrincipal">
                  Organização no Trabalho
                </SelectItem>
                <SelectItem value="4" className="text-roxoPrincipal">
                  Capacidade de Aprender
                </SelectItem>
                <SelectItem value="5" className="text-roxoPrincipal">
                  Ser “Team Player”
                </SelectItem>
              </SelectGroup>
              <Separator className="bg-cinza border-[0.7px]" />
              <SelectGroup>
                <SelectLabel>Execução</SelectLabel>
                <SelectItem value="6" className="text-roxoPrincipal">
                  Entregar com Qualidade
                </SelectItem>
                <SelectItem value="7" className="text-roxoPrincipal">
                  Atender aos Prazos
                </SelectItem>
                <SelectItem value="8" className="text-roxoPrincipal">
                  Fazer Mais com Menos
                </SelectItem>
                <SelectItem value="9" className="text-roxoPrincipal">
                  Pensar Fora da Caixa
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="86%">
        <BarChart
          width={500}
          height={400}
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey='date' tickFormatter={formatDate} />
          <YAxis ticks={[1, 2, 3, 4, 5]} domain={[0, 5]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={selectedCriterion != 'empty' ? 'SelfAssessmentScores[0].grade' : 'meanGrade'}
            fill="#570EFF"
            maxBarSize={100}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
