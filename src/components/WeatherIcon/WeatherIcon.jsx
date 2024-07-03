import React from "react";
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiDayShowers,
  WiNightShowers,
  WiDayRain,
  WiNightRain,
  WiDayThunderstorm,
  WiNightThunderstorm,
  WiSnow,
  WiDayFog,
  WiNightFog,
} from "react-icons/wi";

const WeatherIcon = ({ icon, size = 128, color = "white" }) => {
  const getIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
        return <WiDaySunny size={size} color={color} />;
      case "01n":
        return <WiNightClear size={size} color={color} />;
      case "02d":
        return <WiDayCloudy size={size} color={color} />;
      case "02n":
        return <WiNightAltCloudy size={size} color={color} />;
      case "03d":
      case "03n":
        return <WiCloud size={size} color={color} />;
      case "04d":
      case "04n":
        return <WiCloudy size={size} color={color} />;
      case "09d":
        return <WiDayShowers size={size} color={color} />;
      case "09n":
        return <WiNightShowers size={size} color={color} />;
      case "10d":
        return <WiDayRain size={size} color={color} />;
      case "10n":
        return <WiNightRain size={size} color={color} />;
      case "11d":
        return <WiDayThunderstorm size={size} color={color} />;
      case "11n":
        return <WiNightThunderstorm size={size} color={color} />;
      case "13d":
      case "13n":
        return <WiSnow size={size} color={color} />;
      case "50d":
        return <WiDayFog size={size} color={color} />;
      case "50n":
        return <WiNightFog size={size} color={color} />;
      default:
        return <WiDaySunny size={size} color={color} />;
    }
  };

  return getIcon(icon);
};

export default WeatherIcon;
