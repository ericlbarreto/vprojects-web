import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface Data {
    name: string;
    uv: number;
    fill: string;
}

const data: Data[] = [
    {
        name: '0-100',
        uv: 60,
        fill: '#4A3AFF',
    },
];

const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
};

interface LabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
}

const renderCustomizedLabel = ({ cx, cy }: LabelProps) => {
    return (
        <text
            x={cx}
            y={cy}
            fill="#4A3AFF"
            textAnchor={'middle'}
            dominantBaseline="central"
            fontSize={40}
            fontWeight={700}
        >
            {data[0].uv}%
        </text>
    );
};

interface CustomDotProps {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
}

const renderCustomDot = ({ cx, cy, innerRadius, outerRadius, endAngle, fill }: CustomDotProps) => {
    const RADIAN = Math.PI / 180;
    const radius = (innerRadius + outerRadius) / 2;
    const x = cx + radius * Math.cos(-endAngle * RADIAN);
    const y = cy + radius * Math.sin(-endAngle * RADIAN);

    return (
        <circle cx={x} cy={y} r={16} fill={fill} stroke="#fff" strokeWidth={4} />
    );
};

export default function RadialGraphic() {
    const endAngle = 90 + (360 * data[0].uv / 100); // Calculando o ângulo final com base no valor de UV

    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadialBarChart
                cx={200}
                cy={200}
                innerRadius={100}
                outerRadius={140}
                barSize={10}
                data={data}
                startAngle={90}
                endAngle={endAngle}
            >
                <RadialBar
                    // minAngle={15}
                    background
                    label={renderCustomizedLabel}
                    dataKey="uv"
                    cornerRadius={50}
                />
                {renderCustomDot({
                    cx: 200,
                    cy: 200,
                    innerRadius: 100,
                    outerRadius: 100,
                    startAngle: 90,
                    endAngle: endAngle,
                    fill: '#4A3AFF'
                })}
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
        </ResponsiveContainer>
    );
}
