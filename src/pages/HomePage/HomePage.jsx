import React, { useEffect, useState } from "react";
import CurrentWeatherContainer from "../../containers/CurrentWeatherContainer";
import ExtendedForcastContainer from "../../containers/ExtendedForecastContainer";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import "./styles.css";
import { getWeatherData } from "../../api/getWeatherData";
import { getFiveDayForecast } from "../../api/getFiveDayForecast";
import { Autocomplete, TextField } from "@mui/material";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const NYC_LAT = 40.7128;
const NYC_LON = -74.006;

const HomePage = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMetric, setIsMetric] = useState(false);
  const [cityName, setCityName] = useState("New York, NY, USA");
  const [coordinates, setCoordinates] = useState({
    lat: NYC_LAT,
    lon: NYC_LON,
  });

  const {
    ready,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      types: ["(cities)"],
    },
  });

  const handleSelect = async (address) => {
    if (address) {
      try {
        setValue(address?.description, false);
        clearSuggestions();
        const results = await getGeocode({ address: address?.description });
        const { lng, lat } = await getLatLng(results[0]);
        setCoordinates({ lat, lon: lng });
        setCityName(address?.description);
        setLoading(true);
        setWeatherData(await getWeatherData(lat, lng, isMetric));
        setForecast(await getFiveDayForecast(lat, lng, isMetric));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUnitToggle = () => {
    setIsMetric((prev) => !prev);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setWeatherData(
          await getWeatherData(coordinates.lat, coordinates.lon, isMetric)
        );
        setForecast(
          await getFiveDayForecast(coordinates.lat, coordinates.lon, isMetric)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [isMetric, coordinates]);

  return (
    <div className="home-page">
      <Grid container spacing={2} sx={{ height: "fit-content" }}>
        <Grid item xs={9} md={8} sx={{ height: "10vh" }}>
          <div className="search-bar">
            <Autocomplete
              id="location-search"
              options={data}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.description
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      color: "black",
                      "&:before": {
                        borderBottom: "2px solid black",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "2px solid black",
                      },
                      "&.Mui-focused:after": {
                        borderBottom: "2px solid black",
                      },
                    },
                  }}
                  label="Location"
                  variant="standard"
                  fullWidth
                  onChange={(event) => setValue(event.target.value)}
                />
              )}
              isOptionEqualToValue={() => true} // annoying override for autocomplete API errors
              fullWidth
              onInputChange={(event, newInputValue) => {
                setValue(newInputValue);
              }}
              onChange={(event, newValue) => {
                handleSelect(newValue);
              }}
              loading={!ready}
            />
          </div>
        </Grid>
        <Grid item xs={3} md={4} sx={{ height: "10vh" }}>
          <div className="metric-system-toggle">
            <span>ºF</span>
            <Switch
              checked={isMetric}
              onChange={handleUnitToggle}
              color="primary"
            />
            <span>ºC</span>
          </div>
        </Grid>
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
        <Grid
          className="extended-forecast-container-grid"
          item
          xs={12}
          sx={{ height: "40vh", padding: "1rem 0 2rem 1rem" }}
        >
          <ExtendedForcastContainer
            forecast={forecast}
            loading={loading}
            cityName={cityName}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
