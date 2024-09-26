import { useSelector } from "react-redux";
import "../styles/WeekForecast.css"
import { mapClimateImage } from "../utilities/ClimateImageMap";
import { tempValueMap } from "../utilities/TempValueMap";

const WeekForecast = () => {


  const cityWeatherData = useSelector((state) => state.weather.cityWeatherData);
  const tempValue = useSelector((state) => state.options.tempValue);



  return (
    <div className='week-forecast-wrapper'>
      <div className="title">7 DAY FORECAST</div>
      <div className="week-forecast-container">

        {
          cityWeatherData.weekForecast.map((forecast, index) => {
            return (
              <div key={index} className="row">
                <div className="column">{forecast.day}</div>
                <div className="column center">
                  <img src={mapClimateImage(forecast.climate)} alt="" />
                  <div className="climate">{forecast.climate}</div>
                  </div>
                <div className="column">
                  {tempValueMap(tempValue, forecast.lowTemp)} - 
                  {tempValueMap(tempValue, forecast.highTemp)}
                </div>
              </div>

            )
          })
        }


      </div>
    </div>
  )
}

export default WeekForecast
