import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressWithDotProps {
    value: number;
}

const CircularProgressWithDot = ({ value }: CircularProgressWithDotProps) => {
  return (
    <CircularProgressbar
        value={value}
        strokeWidth={14}
        className='font-bold max-w-72'
        styles={buildStyles({
          pathColor: '#4A3AFF',
          trailColor: '#F0E5FC',
          textColor: '#4A3AFF'// Ajustando a cor do texto para roxo
        })}
        text={`${value}%`}
      />
  );
};

export default CircularProgressWithDot;

// const CircularProgressWithDot = ({ value }: CircularProgressWithDotProps) => {
//     const radius = 50; // Raio da barra de progresso
//     const center = 50; // Centro do componente
  
//     const endAngle = 360 * (value / 100); // Ângulo final baseado no valor
//     const radians = (Math.PI / 180) * endAngle;
//     const x = center + radius * Math.cos(radians - Math.PI / 2);
//     const y = center + radius * Math.sin(radians - Math.PI / 2);
  
//     return (
//       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//         <CircularProgressbar
//           value={value}
//           strokeWidth={14}
//           styles={buildStyles({
//             pathColor: '#4A3AFF',
//             trailColor: '#F0E5FC',
//             textColor: '#4A3AFF', // Ajustando a cor do texto para roxo
//           })}
//           text={`${value}%`}
//         />
//         <svg
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             overflow: 'visible',
//             width: '100%',
//             height: '100%'
//           }}
//         >
//           <circle
//             cx={x}
//             cy={y}
//             r={28} // Ajustando o tamanho da bolinha para ser relativo ao strokeWidth
//             fill="#4A3AFF"
//             stroke="#fff"
//             strokeWidth={3}
//           />
//         </svg>
//       </div>
//     );
//   };
  
//   export default CircularProgressWithDot;
