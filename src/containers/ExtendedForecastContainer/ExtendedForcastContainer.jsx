import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./styles.css";
import ForecastCard from "../../components/ForecastCard";
import { useMediaQuery } from "react-responsive";

const ExtendedForcastContainer = ({ forecast, loading }) => {
  const [openCard, setOpenCard] = useState("5");

  const wideScreen = useMediaQuery({
    query: "(max-width: 900px)",
  });

  return (
    <div className="current-weather-container">
      <p className="sub-heading">5 day weather forecast</p>
      <Grid container sx={{ flexGrow: 1 }}>
        {forecast?.map((forecastData, index) => (
          <ForecastCard
            key={index}
            wideScreen={wideScreen}
            loading={loading}
            id={index}
            openCard={openCard}
            setOpenCard={setOpenCard}
            forecast={forecastData}
          />
        ))}
      </Grid>
    </div>
  );
};

export default ExtendedForcastContainer;
