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
  YAxis
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
  console.log(calculateAverages(data))
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        width={500}
        height={300}
        data={calculateAverages(data).reverse()}
        barCategoryGap={180}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="endDate" tickFormatter={formatDate} />
        <YAxis ticks={[1, 2, 3, 4, 5]} domain={[0, 5]} />
        <Tooltip labelFormatter={(value: string) => formatDate(value)}/>
        <Bar
          dataKey="Administração"
          fill="#962DFF"
          maxBarSize={50}
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#962DFF" />}
        />
        <Bar
          dataKey="Design"
          fill="#4A3AFF"
          maxBarSize={50}
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#4A3AFF" />}
        />
        <Bar
          dataKey="Educação"
          fill="#E0C6FD"
          maxBarSize={50}
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#E0C6FD" />}
        />
        <Bar
          dataKey="Gerência"
          fill="#93AAFD"
          maxBarSize={50}
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#93AAFD" />}
        />
        <Bar
          dataKey="QA"
          fill="#93FDCA"
          maxBarSize={50}
          radius={[10, 10, 0, 0]}
          activeBar={<Rectangle fill="#93FDCA"/>}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
