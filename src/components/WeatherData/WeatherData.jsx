import React from "react";
import "./styles.css";

const WeatherData = ({
  label,
  value,
  valueSize = "24px",
  labelSize = "16px",
}) => {
  return (
    <div className="weather-data">
      <p className="weather-data-value" style={{ fontSize: valueSize }}>
        {value}
      </p>
      <p className="weather-data-label" style={{ fontSize: labelSize }}>
        {label}
      </p>
    </div>
  );
};

export default WeatherData;
