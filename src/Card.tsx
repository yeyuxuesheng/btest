import {ReactElement} from "react"
import "./Card.css"
import _default from "chart.js/dist/core/core.interaction";

import CircleProgress from './CircleProgress';
import {TimeAir} from "./Weather";

export type Data = {
  country: string,
  province: string
  name: string
  condition: string
  temperature: number
  weather: string
  advice: string
  detail: {
    title: string
    value: string
  }[]
  air: TimeAir
}


const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${formatInt(date.getMonth() + 1)}-${formatInt(date.getDate())} ${formatInt(date.getHours())}:${formatInt(date.getMinutes())}`
}

const formatInt = (num: number): string => {
  return ("0" + num).slice(-2)
}

const generateWeatherImg = (weather: string) => {
  if (weather.includes("晴")) {
    return "/100.png"
  }
  if (weather.includes("阴")) {
    return "/101.png"
  }
  if (weather.includes("雨")) {
    return "/305.png"
  }
  if (weather.includes("雪")) {
    return "/101.png"
  }
  if (weather.includes("多云")) {
    return "/104.png"
  }
  if (weather.includes("阴")) {
    return "/104.png"
  }
}


export default (props: { data: Data }) => {
  const {
    name,
    province,
    country,
    condition,
    temperature,
    weather,
    advice,
    detail,
  } = props.data;

  // 安全转换函数
  const parseAirValue = (val: string) => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };


  return <div className="current-weather">
    <div className="location">
      <div>
        <h1 className={"content"}>{name}</h1>
        <span className={"mini"}>{province}/{country}</span>
      </div>
      <p className="mini">{formatDate(new Date())}</p>
    </div>
    <div className="weather">
      <div className={"condition-container"}>
        <div className={"condition"}>{condition}</div>
      </div>
      <div className="weather-data">
        <img src={generateWeatherImg(weather)} alt="Weather"/>
        <div className={"weather-data-detail"}>
          <span className={"display"}>{temperature}°</span>
          
          <span>{weather}</span>
        </div>
      </div>
    </div>
    <div className="current-abstract content">
      {advice}

    </div>


<div className="air-quality">
  {/* PM2.5 */}
  <div className="air-indicator">
    <CircleProgress 
      value={Number(props.data.air.pm2p5)} 
      label="PM2.5" 
    />
  </div>

  {/* PM10 */}
  <div className="air-indicator">
    <CircleProgress 
      value={Number(props.data.air.pm10)} 
      label="PM10" 
    />
  </div>

  {/* SO₂ */}
  <div className="air-indicator">
    <CircleProgress 
      value={Number(props.data.air.so2)} 
      label="SO₂" 
    />
  </div>

  {/* NO₂ */}
  <div className="air-indicator">
    <CircleProgress 
      value={Number(props.data.air.no2)} 
      label="NO₂" 
    />
  </div>
</div>



    <div className="current-basic">
    </div>
  </div>
}

