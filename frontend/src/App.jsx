import React, { useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import WeatherDetails from './components/WeatherDetails'
import WeekForecast from './components/WeekForecast'
import { useSelector } from 'react-redux'

const App = () => {

  const city = useSelector((state) => state.weather.city);
  const status = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);


  const renderContent = () => {
    if (!city) {
      return <div className='status-fields'>Select city to get weather details</div>;
    }

    if (status === 'loading') {
      return <div className='status-fields'>Loading weather data...</div>;
    }

    if (error) {
      if (error.status === 404)
        return <div className='status-fields'>Cannot get weather data for city '{city}'</div>;

      return <div className='status-fields'>Error fetching data</div>;
    }

    return (
      <>
        <WeatherDetails />
        <WeekForecast />
      </>
    );
  };


  return (
    <div className='app-wrapper'>
      <div className="app-content">
        <div className="top-search-bar">
          <TopBar />
        </div>
        <div className="weather-content">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default App
