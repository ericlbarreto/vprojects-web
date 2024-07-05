import { EqualizationCycle } from "@/interfaces/EqualizationCycle";
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

function calculateAverages(cycles: EqualizationCycle[]) {
  return cycles.map(cycle => {
    const sectorGrades: { [key: string]: number[] } = {};

    cycle.Equalizations.forEach(equalization => {
      const sector = equalization.evaluated.sector;
      const grade = equalization.finalGrade;

      if (!sectorGrades[sector]) {
        sectorGrades[sector] = [];
      }
      sectorGrades[sector].push(grade);
    });

    const averages: { [key: string]: number } = {};
    for (const [sector, grades] of Object.entries(sectorGrades)) {
      averages[sector] = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    }

    return {
      endDate: cycle.endDate,
      ...averages,
    };
  });
}

interface MultipleBarGraphicProps {
  data: EqualizationCycle[];

}

export default function MultipleBarGraphic({ data }: MultipleBarGraphicProps) {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        width={500}
        height={300}
        data={calculateAverages(data)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="endDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Sector 1"
          fill="#962DFF"
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#962DFF" />}
        />
        <Bar
          dataKey="Sector 2"
          fill="#4A3AFF"
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#4A3AFF" />}
        />
        <Bar
          dataKey="Sector 3"
          fill="#E0C6FD"
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#E0C6FD" />}
        />
        <Bar
          dataKey="Sector 4"
          fill="#93AAFD"
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#93AAFD" />}
        />
        <Bar
          dataKey="Sector 5"
          fill="#93FDCA"
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#93FDCA"/>}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
