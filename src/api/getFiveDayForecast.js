import moment from "moment";
import { convertToLocalTime } from "../util/convertToLocalTime";

export const getFiveDayForecast = async (lat, lon, isMetric) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=${
        isMetric ? "metric" : "imperial"
      }&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    console.error("Error fetching five day forecast data:", error);
    throw error;
  }
};

const processWeatherData = (data) => {
  const groupedData = groupDataByDate(data.list, data.city);
  return createDailySummaries(groupedData, data.city.timezone).slice(0, 5);
};

const groupDataByDate = (list, city) => {
  const groupedData = {};

  list.forEach(({ dt_txt, main, wind, weather }) => {
    const date = getDayOfWeek(dt_txt.split(" ")[0]);
    if (!groupedData[date]) {
      groupedData[date] = {
        tempSum: 0,
        feelsLikeSum: 0,
        humiditySum: 0,
        windSpeedSum: 0,
        count: 0,
        tempMax: main.temp,
        tempMin: main.temp,
        weatherIcons: [],
        weatherDescriptions: {},
        sunrise: city.sunrise,
        sunset: city.sunset,
      };
    }

    const dayData = groupedData[date];
    dayData.tempSum += main.temp;
    dayData.feelsLikeSum += main.feels_like;
    dayData.humiditySum += main.humidity;
    dayData.windSpeedSum += wind.speed;
    dayData.count += 1;
    dayData.tempMax = Math.max(dayData.tempMax, main.temp_max);
    dayData.tempMin = Math.min(dayData.tempMin, main.temp_min);
    dayData.weatherIcons.push(weather[0].icon);

    const description = weather[0].description;
    dayData.weatherDescriptions[description] =
      (dayData.weatherDescriptions[description] || 0) + 1;
  });

  return groupedData;
};

const createDailySummaries = (groupedData, timezone) => {
  return Object.keys(groupedData).map((date) => {
    const {
      tempSum,
      feelsLikeSum,
      humiditySum,
      windSpeedSum,
      count,
      tempMax,
      tempMin,
      weatherIcons,
      weatherDescriptions,
      sunrise,
      sunset,
    } = groupedData[date];
    const avgTemp = tempSum / count;
    const avgFeelsLike = feelsLikeSum / count;
    const avgHumidity = humiditySum / count;
    const avgWindSpeed = windSpeedSum / count;
    const weatherDescription = getMostCommon(weatherDescriptions);
    const weatherIcon = getMostCommon(weatherIcons);

    return {
      date,
      avgTemp,
      avgFeelsLike,
      avgHumidity,
      avgWindSpeed,
      tempMax,
      tempMin,
      weatherDescription,
      weatherIcon,
      sunrise: convertToLocalTime(sunrise, timezone),
      sunset: convertToLocalTime(sunset, timezone),
      timezone: `UTC${timezone >= 0 ? "+" : ""}${timezone / 3600}`,
    };
  });
};

const getMostCommon = (items) => {
  if (!Array.isArray(items)) {
    items = Object.entries(items).reduce((acc, [item, count]) => {
      acc.push(...Array(count).fill(item));
      return acc;
    }, []);
  }

  const itemCounts = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(itemCounts).reduce((a, b) =>
    itemCounts[a] > itemCounts[b] ? a : b
  );
};

const getDayOfWeek = (dateString) => {
  return moment(dateString).format("dddd");
};
