import loader from "./assets/loader.svg"
import browser from "./assets/browser.svg"
import "./App.css"
import { useEffect, useState } from "react";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY
function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [errorInfo, setErrorInfo] = useState(null)

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
      .then(response => {
        // 400 - 599 : Erreur a gerer a la main
        if(!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`)
        return response.json()
      })
      .then(responceData => {
        console.log(responceData);
        setWeatherData({
          city: responceData.data.city,
          country: responceData.data.country,
          iconId: responceData.data.current.weather.ic,
          temperature: responceData.data.current.weather.tp
        })
      })
      .catch(err => {
        console.log(err);
        setErrorInfo(err.message)
      })
  }, [])

  return (

    <main>
      <div className={`loader-container ${(!weatherData && !errorInfo)&& "active"}`}>
        <img src={loader} alt="loader" />
      </div>
      {weatherData && (
        <>
          <p className="city-name">{weatherData.city}</p>
          <p className="country-name">{weatherData.country}</p>
          <p className="temperature">{weatherData.temperature}°</p>
          <div className="info-icon-container">
            <img src={`/icons/${weatherData.iconId}.svg`} className="info-icon" alt="weather icon" />
          </div>
        </>
      )}

      {(errorInfo && !weatherData) && (
        <>
          <p className="error-information">{errorInfo}</p>
          <img src={browser} alt="error" />
        </>
      )}
    </main>

  );
}

export default App;
