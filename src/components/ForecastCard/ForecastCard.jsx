import React from "react";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import WeatherIcon from "../../components/WeatherIcon";
import WeatherData from "../../components/WeatherData";
import "./styles.css";
import { toInt } from "../../util/toInt";

const ForecastCard = ({
  id,
  openCard,
  setOpenCard,
  forecast,
  loading,
  wideScreen,
}) => {
  return (
    <motion.div
      className="forecast-card-container"
      style={{
        width:
          openCard === id
            ? "40%"
            : openCard === "6" // all selected
            ? "100%"
            : openCard === "5" // none selected
            ? "20%"
            : "15%",
      }}
    >
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout
        onClick={() => setOpenCard(openCard === id ? "5" : id)}
        className="card"
        style={{
          justifyContent: openCard === id ? "space-between" : "center",
          cursor: wideScreen ? "default" : "pointer",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <motion.div
              transition={{ layout: { duration: 1, type: "spring" } }}
              layout
              className="forecast-thumbnail"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ layout: { duration: 1, type: "spring" } }}
                layout="position"
                className="forecast-date"
              >
                {forecast?.date}
              </motion.h2>
              <WeatherIcon size={128} icon={forecast?.weatherIcon} />
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ layout: { duration: 1, type: "spring" } }}
                layout="position"
                className="forecast-date"
              >
                {toInt(forecast?.avgTemp)}º
              </motion.h2>
            </motion.div>

            {(openCard === id || wideScreen) && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="expanded-forecast"
                >
                  <Grid container sx={{ height: "100%" }}>
                    <Grid item xs={6} md={6} sx={{ height: "15vh" }}>
                      <WeatherData
                        label="High"
                        value={`${toInt(forecast.tempMax)}º`}
                        degree={true}
                        valueSize="20px"
                      />
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ height: "15vh" }}>
                      <WeatherData
                        label="Sunrise"
                        value={`${forecast.sunrise}`}
                        valueSize="20px"
                      />
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ height: "15vh" }}>
                      <WeatherData
                        label="Low"
                        value={`${toInt(forecast.tempMin)}º`}
                        degree={true}
                        valueSize="20px"
                      />
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ height: "15vh" }}>
                      <WeatherData
                        label="Sunset"
                        value={`${forecast.sunset}`}
                        valueSize="20px"
                      />
                    </Grid>
                  </Grid>
                </motion.div>
              </>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ForecastCard;
