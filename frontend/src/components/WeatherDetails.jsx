import "../styles/WeatherDetails.css"
import { useSelector } from "react-redux";
import { mapClimateImage } from "../utilities/ClimateImageMap";
import { tempValueMap } from "../utilities/TempValueMap";


const WeatherDetails = () => {

    const cityWeatherData = useSelector((state) => state.weather.cityWeatherData);
    const tempValue = useSelector((state) => state.options.tempValue);    

    return (
        <div className='weather-forecast'>
            <div className="no-bg top-section">
                <div className="left">
                    <div className="climate">{cityWeatherData.climate}</div>
                    <div className="location">{cityWeatherData.city}</div>
                    <div className="temp">{tempValueMap(tempValue, cityWeatherData.temp)}</div>
                    <div className="rain-change">Chance of rain: {cityWeatherData.chanceOfRain}%</div>
                </div>
                <div className="right">
                    <img src={mapClimateImage(cityWeatherData.climate)} alt="" />
                </div>
            </div>
            <div className="sections mid-section">
                <div className="section-title">
                    TODAY'S FORECAST
                </div>
                <div className="today-forecast-container">
                    {
                        cityWeatherData.todayForecast.map((forecast, index) => {
                            return (
                                <div key={index} className="card">
                                    <div className="time">
                                        {forecast.time}
                                    </div>
                                    <div className="climate-img">
                                        <img src={mapClimateImage(forecast.climate)} alt="" />
                                    </div>
                                    <div className="temp">
                                        {tempValueMap(tempValue, forecast.temp)}
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
            <div className="sections other-info">
                <div className="row">
                    <div className="column">
                        <div className="title">Low Temp</div>
                        <div className="value">{tempValueMap(tempValue, cityWeatherData.lowTemp)}</div>
                    </div>
                    <div className="column">
                        <div className="title">High Temp</div>
                        <div className="value">{tempValueMap(tempValue, cityWeatherData.highTemp)}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="title">Wind Speed</div>
                        <div className="value">{cityWeatherData.wind.speed.kmph} kmph</div>
                    </div>
                    <div className="column">
                        <div className="title">Wind Direction</div>
                        <div className="value">{cityWeatherData.wind.direction}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherDetails
