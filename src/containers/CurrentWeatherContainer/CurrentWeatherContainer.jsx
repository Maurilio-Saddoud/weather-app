import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles.css";
import WeatherData from "../../components/WeatherData";
import { toInt } from "../../util/toInt";

const moment = require("moment");

const CurrentWeatherContainer = ({ weatherData, loading, cityName }) => {
  const [icon, setIcon] = useState(
    "http://openweathermap.org/img/wn/4d@4x.png"
  );

  useEffect(() => {
    const iconCode = weatherData?.weather && weatherData?.weather[0]?.icon;
    setIcon(`http://openweathermap.org/img/wn/${iconCode}@4x.png`);
  }, [weatherData]);

  return (
    <div className="current-weather-container">
      <p className="city">{cityName}</p>
      <p className="date">{moment().format("dddd DD MMMM")}</p>
      <div className="icon-container">
        {!loading ? (
          <>
            <img src={icon} alt="Weather icon" />
            <p className="temperature">{toInt(weatherData?.main?.temp)}º</p>
            <p className="weather-details">{weatherData?.weather[0]?.main}</p>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      <div className="weather-data-container">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <WeatherData
              label="High"
              value={`${toInt(weatherData?.main?.temp_max)}º`}
            />
            <WeatherData
              label="Feels Like"
              value={`${toInt(weatherData?.main?.feels_like)}º`}
            />
            <WeatherData
              label="Sunrise"
              value={`${weatherData?.sys?.sunrise}`}
            />
            <WeatherData
              label="Low"
              value={`${toInt(weatherData?.main?.temp_min)}º`}
            />
            <WeatherData
              label="Humidity"
              value={`${toInt(weatherData?.main?.humidity)}%`}
            />
            <WeatherData label="Sunset" value={`${weatherData?.sys?.sunset}`} />
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentWeatherContainer;
