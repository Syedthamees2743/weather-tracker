const API_KEY = "962186cc30541014bb0460dac741c548";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeather = async (city) => {
  // Demo Mode Logic
  if (!API_KEY ) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock Current Data
        // ... inside the Promise resolve for Demo Mode ...

        // Determine a random temperature between -5 and 35 for demo purposes
        const randomTemp = Math.floor(Math.random() * 40) - 5;

        const current = {
          name: city,
          sys: { country: "DEMO", sunrise: 1680000000, sunset: 1680040000 },
          weather: [
            {
              main:
                randomTemp > 25 ? "Clear" : randomTemp < 5 ? "Snow" : "Clouds",
              description: "Demo Mode",
            },
          ],
          main: {
            temp: randomTemp,
            feels_like: randomTemp + 2,
            humidity: 80,
            pressure: 1012,
          },
          wind: { speed: 5.5 },
          visibility: 8000,
        };

        // Generate forecast based on the random temp
        const forecastList = [];
        for (let i = 1; i <= 5; i++) {
          forecastList.push({
            dt: Date.now() / 1000 + i * 86400,
            main: { temp: randomTemp + (i % 3) },
            weather: [{ main: randomTemp > 25 ? "Clear" : "Clouds" }],
          });
        }
        // ... rest of code

        resolve({ current, forecast: forecastList });
      }, 1000);
    });
  }

  // Real API Calls (Parallel)
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`),
    fetch(`${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`),
  ]);

  if (!currentRes.ok || !forecastRes.ok) throw new Error("City not found");

  const current = await currentRes.json();
  const forecastData = await forecastRes.json();

  // Process forecast to get one reading per day (at noon)
  const dailyForecast = forecastData.list
    .filter((reading) => reading.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  return { current, forecast: dailyForecast };
};
