import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles.css";
import { Grid } from "@mui/material";
import WeatherData from "../../components/WeatherData";
import CurrentWeatherInformation from "../../components/CurrentWeatherInformation";
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
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} sx={{ height: "10vh" }}>
          <p className="city">{cityName}</p>
          <p className="date">{moment().format("dddd D MMMM")}</p>
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "40vh" }}>
          <div className="icon-container">
            {!loading ? (
              <>
                <img src={icon} alt="Weather icon" />
                <CurrentWeatherInformation weatherData={weatherData} />
              </>
            ) : (
              <CircularProgress />
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "fit-content" }}>
          <div className="weather-data-container">
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container sx={{ height: "100%" }}>
                <Grid item xs={6} sm={4} sx={{ height: "20vh" }}>
                  <WeatherData
                    label="High"
                    value={`${toInt(weatherData?.main?.temp_max)}º`}
                  />
                </Grid>
                <Grid item xs={6} sm={4} sx={{ height: "20vh" }}>
                  <WeatherData
                    label="Feels Like"
                    value={`${toInt(weatherData?.main?.feels_like)}º`}
                  />
                </Grid>

                <Grid item xs={6} sm={4} sx={{ height: "20vh" }}>
                  <WeatherData
                    label="Sunrise"
                    value={`${weatherData?.sys?.sunrise}`}
                  />
                </Grid>
                <Grid item xs={6} sm={4} sx={{ height: "20vh" }}>
                  <WeatherData
                    label="Low"
                    value={`${toInt(weatherData?.main?.temp_min)}º`}
                  />
                </Grid>
                <Grid item xs={6} sm={4} sx={{ height: "20vh" }}>
                  <WeatherData
                    label="Humidity"
                    value={`${toInt(weatherData?.main?.humidity)}%`}
                  />
                </Grid>
                <Grid item xs={6} sm={4} sx={{ height: "20vh" }}>
                  <WeatherData
                    label="Sunset"
                    value={`${weatherData?.sys?.sunset}`}
                  />
                </Grid>
              </Grid>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CurrentWeatherContainer;
