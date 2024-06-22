import {
    Legend,
    RadialBar,
    RadialBarChart,
    Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Progress',
    uv: 40,
    fill: '#8884d8',
  },
];

const style = {
  top: 0,
  left: 350,
  lineHeight: '24px',
};

export default function RadialGraphic() {
  return (
    <RadialBarChart
      width={400}
      height={400}
      cx={200}
      cy={200}
      innerRadius={100}
      outerRadius={140}
      barSize={10}
      data={data}
      startAngle={90}
      endAngle={450}
    >
      <RadialBar
        // minAngle={15}
        background
        // clockWise
        dataKey="uv"
      />
      <Legend
        iconSize={10}
        width={120}
        height={140}
        layout="vertical"
        verticalAlign="middle"
        wrapperStyle={style}
      />
      <Tooltip />
    </RadialBarChart>
  );
};

