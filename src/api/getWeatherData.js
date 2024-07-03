import { convertToLocalTime } from "../util/convertToLocalTime";

export const getWeatherData = async (lat, lon, isMetric) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=${
        isMetric ? "metric" : "imperial"
      }&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return {
      ...data,
      sys: {
        ...data.sys,
        sunset: convertToLocalTime(data.sys.sunset),
        sunrise: convertToLocalTime(data.sys.sunrise),
      },
    };
  } catch (error) {
    console.error("Error fetching current weather data:", error);
    throw error;
  }
};
