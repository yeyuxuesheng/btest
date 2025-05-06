// CircleProgress.tsx
import { useEffect, useRef } from 'react';
import './CircleProgress.css';

interface Props {
  value: number; // 数值范围0-300
  size?: number; // 圆圈尺寸，默认80px
  label?: string; // 类型
  maxValue?: number; //最大值
}

const getAirQualityEvaluation = (value: number) => {
  if (value <= 50) return { grade: '优', color: '#15cc04' };
  if (value <= 100) return { grade: '良', color: '#f5ed11' };
  if (value <= 150) return { grade: '轻度污染', color: '#FF9800' };
  if (value <= 200) return { grade: '中度污染', color: '#F44336' };
  if (value <= 300) return { grade: '重度污染', color: '#9C27B0' };
  return { grade: '严重污染', color: '#795548' };
};


const CircleProgress = ({ 
  value, 
  size = 80, 
  label = '',
  maxValue = 300
}: Props) => {
  const evaluation = getAirQualityEvaluation(value);
  
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = (size - 20) / 2; // 减去边框宽度
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference - (value / 300) * circumference}`;
    }
  }, [value]);

  return (
    <svg width={size+150} height={size}> 
      {/* 背景圆环 */}
      <circle 
        cx={size / 2} 
        cy={size / 2} 
        r={radius} 
        fill="none" 
        stroke="#e0e0e0" 
        strokeWidth="10"
      />

      {/* 渐变进度条 */}
      <circle
        cx={size/2}
        cy={size/2}
        r={radius}
        fill="none"
        stroke={evaluation.color} // 动态颜色
        strokeWidth="10"
        strokeLinecap="round"
        transform={`rotate(90 ${size/2} ${size/2})`}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference - (value/maxValue)*circumference}
      />

      {/* 评价标签 */}
      <text 
        x={size + 10} 
        y={size/2 - 5}
        textAnchor="start"
        fontSize={size * 0.30}
        fill={evaluation.color}
        fontWeight="bold"
      >
        {evaluation.grade}
      </text>

      {/* 添加标签显示 */}
      <text 
        x={size / 2+50} 
        y={size / 2+25}  
        textAnchor="start"
        fontSize={size * 0.25} // 字体大小为尺寸的15%
        fill="#666"
      >
        {label}
      </text>
      
      {/* 修改数值显示位置 */}
      <text 
        x={size / 2} 
        y={size / 2}  // 下移15像素
        textAnchor="middle" 
        dominantBaseline="central" 
        fontSize={size * 0.25} // 字体大小为尺寸的25%
        fontWeight="bold"
        fill="#333"
      >
        {value}
      </text>
    </svg>
  );
};

export default CircleProgress;