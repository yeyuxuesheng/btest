import Temperature, {Prop as TemperaturePros} from "./Temperature";
import Card, {Data} from "./Card";
import React, {useEffect, useState} from "react";
import "./App.css"
import {Location, TimeAir} from "./Weather";
import {getProvider, TimeWeather} from "./Weather";

const data: TemperaturePros[] = [
  {
    humidity: 12, temperature: 36, time: new Date(),
  },
  {
    humidity: 19, temperature: 48, time: new Date(),
  },
  {
    humidity: 22, temperature: 29, time: new Date(),
  },
  {
    humidity: 18, temperature: 50, time: new Date(),
  },
  {
    humidity: 19, temperature: 60, time: new Date(),
  }]

const current: Data = {
  name: "未知",
  detail: [],
  advice: "",
  condition: "空气质量未知",
  country: "未知", province: "未知", temperature: 23, weather: "晴",
  air: {  // 添加默认的 air 对象
    pm2p5: "0",
    pm10: "0",
    so2: "0",
    no2: "0",
    category: "未知",
    time: new Date()
  }
}


const generateDetail = (data: TimeAir):Data["detail"] => {
  return [{
    title: "SO₂(二氧化硫)",
    value: data.so2,
  }, {
    title: "NO₂(二氧化氮)",
    value: data.no2,
  }, {
    title: "PM10",
    value: data.pm10,
  },{
    title: "PM2.5",
    value: data.pm2p5,
  }]
}

function App() {
  const [temp, setTemp] = useState<TemperaturePros[]>([])
  const [data,setData] = useState<Data>(current)
  useEffect(() => {
    const provider = getProvider()
  provider.getLocation().then(location => {
    // 初始化基础数据
    const baseData = {
      ...current,
      ...location,
      air: current.air // 保留默认空气质量数据
    };
    setData(baseData);

    // 并行获取所有数据
    return Promise.all([
      provider.getWeather(location),
      provider.getAir(location),
      provider.getIndices(location)
    ]).then(([weatherData, airData, advice]) => {
      // 一次性合并所有数据
      const mergedData: Data = {
        ...baseData,
        temperature: weatherData[0].temperature,
        weather: weatherData[0].weather,
        air: airData, // 关键修复：正确存储空气质量数据
        detail: generateDetail(airData),
        condition: "空气质量" + airData.category,
        advice: advice
      };
      setData(mergedData);
      setTemp(weatherData);
    });
  }).catch(error => {
    console.error("数据获取失败:", error);
  });
}, []);

  useEffect(() => {
    console.log(data)
  },[data])

  return (
    <div className={"container"}>
      <div className={"card-container"}><Card data={data}/></div>
      <div className={"temperature"}>
        <div className={"temperature-title title"}><span>未来7日温度湿度</span></div>
        <Temperature data={temp}/>
      </div>
    </div>
  )
}

export default App
