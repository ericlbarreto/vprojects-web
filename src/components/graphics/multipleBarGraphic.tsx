import { useState, useEffect } from "react";
import { formatDate } from "@/common/formatDate";
import { EqualizationCycle } from "@/interfaces/EqualizationCycle";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function calculateAverages(
  cycles: EqualizationCycle[],
  selectedYear: string,
  selectedSector: string
) {
  return cycles
    .map((cycle) => {
      const sectorGrades: { [key: string]: number[] } = {};

      cycle.Equalizations.forEach((equalization) => {
        const sector = equalization.evaluated.sector;
        const grade = equalization.finalGrade;

        if (!sectorGrades[sector]) {
          sectorGrades[sector] = [];
        }
        sectorGrades[sector].push(grade);
      });

      const averages: { [key: string]: number } = {};
      for (const [sector, grades] of Object.entries(sectorGrades)) {
        averages[sector] =
          grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      }

      return {
        endDate: cycle.endDate, // Assuming cycle.endDate is already a valid date
        ...averages,
      };
    })
    .filter((item) => {
      const yearCondition =
        selectedYear === "all" ||
        new Date(item.endDate).getFullYear().toString() === selectedYear;
      const sectorCondition =
        selectedSector === "all" || Object.keys(item).includes(selectedSector);
      return yearCondition && sectorCondition;
    });
}

interface MultipleBarGraphicProps {
  data: EqualizationCycle[];
}

export default function MultipleBarGraphic({ data }: MultipleBarGraphicProps) {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [filteredData, setFilteredData] = useState<
    ReturnType<typeof calculateAverages>
  >([]);

  useEffect(() => {
    setFilteredData(calculateAverages(data, selectedYear, selectedSector));
  }, [data, selectedYear, selectedSector]);

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
  };

  return (
    <div className="col-span-5 bg-white rounded-2xl shadow-md relative p-6 h-[600px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-cinza">Gráfico com notas finais</p>
          <h2 className="text-[#2D2D2D] font-bold">por setor</h2>
        </div>
        <div className="flex gap-2">
          <Select onValueChange={handleYearChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue
                placeholder="Ano"
                className="text-roxoPrincipal bg-azulBackground"
              />
            </SelectTrigger>
            <SelectContent className="bg-azulBackground">
              <SelectItem value="all" className="text-roxoPrincipal">
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
            </SelectContent>
          </Select>
          <Select onValueChange={handleSectorChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue
                placeholder="Setores"
                className="text-roxoPrincipal bg-azulBackground"
              />
            </SelectTrigger>
            <SelectContent className="bg-azulBackground">
              <SelectItem value="all" className="text-roxoPrincipal">
                Todos
              </SelectItem>
              <SelectItem value="Administração" className="text-roxoPrincipal">
                Administração
              </SelectItem>
              <SelectItem value="Design" className="text-roxoPrincipal">
                Design
              </SelectItem>
              <SelectItem value="Educação" className="text-roxoPrincipal">
                Educação
              </SelectItem>
              <SelectItem value="Gerência" className="text-roxoPrincipal">
                Gerência
              </SelectItem>
              <SelectItem value="QA" className="text-roxoPrincipal">
                QA
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={filteredData.reverse()}
          barCategoryGap={180}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="endDate"
            tickFormatter={(value: string) => formatDate(value)}
          />
          <YAxis ticks={[1, 2, 3, 4, 5]} domain={[0, 5]} />
          <Tooltip labelFormatter={(value: string) => formatDate(value)} />
          {(selectedSector === "all" || selectedSector === "Administração") && (
            <Bar
              dataKey="Administração"
              fill="#962DFF"
              maxBarSize={50}
              radius={[10, 10, 0, 0]}
              activeBar={<Rectangle fill="#962DFF" />}
            />
          )}
          {(selectedSector === "all" || selectedSector === "Design") && (
            <Bar
              dataKey="Design"
              fill="#4A3AFF"
              maxBarSize={50}
              radius={[10, 10, 0, 0]}
              activeBar={<Rectangle fill="#4A3AFF" />}
            />
          )}
          {(selectedSector === "all" || selectedSector === "Educação") && (
            <Bar
              dataKey="Educação"
              fill="#E0C6FD"
              maxBarSize={50}
              radius={[10, 10, 0, 0]}
              activeBar={<Rectangle fill="#E0C6FD" />}
            />
          )}
          {(selectedSector === "all" || selectedSector === "Gerência") && (
            <Bar
              dataKey="Gerência"
              fill="#93AAFD"
              maxBarSize={50}
              radius={[10, 10, 0, 0]}
              activeBar={<Rectangle fill="#93AAFD" />}
            />
          )}
          {(selectedSector === "all" || selectedSector === "QA") && (
            <Bar
              dataKey="QA"
              fill="#93FDCA"
              maxBarSize={50}
              radius={[10, 10, 0, 0]}
              activeBar={<Rectangle fill="#93FDCA" />}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
