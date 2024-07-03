import React from "react";
import "./styles.css";
import { toInt } from "../../util/toInt";

const CurrentWeatherInformation = ({ weatherData }) => {
  return (
    <div className="current-weather-information-container">
      <div>
        <p className="temperature">{toInt(weatherData?.main?.temp)}º</p>
        <p className="weather-details">{weatherData?.weather[0].main}</p>
      </div>
    </div>
  );
};

export default CurrentWeatherInformation;
