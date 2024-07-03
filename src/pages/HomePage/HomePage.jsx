import React, { useEffect, useState } from "react";
import CurrentWeatherContainer from "../../containers/CurrentWeatherContainer";
import Grid from "@mui/material/Grid";
import "./styles.css";
import { getWeatherData } from "../../api/getWeatherData";
import { getFiveDayForecast } from "../../api/getFiveDayForecast";

const NYC_LAT = 40.7128;
const NYC_LON = -74.006;

const HomePage = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("New York, NY, USA");

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setWeatherData(await getWeatherData(NYC_LAT, NYC_LON));
      setForecast(await getFiveDayForecast(NYC_LAT, NYC_LON));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="home-page">
      <Grid container spacing={2} sx={{ height: "fit-content" }}>
        <Grid
          className="current-weather-container-grid"
          item
          xs={12}
          sx={{ height: "50vh" }}
        >
          <CurrentWeatherContainer
            weatherData={weatherData}
            loading={loading}
            cityName={cityName}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
