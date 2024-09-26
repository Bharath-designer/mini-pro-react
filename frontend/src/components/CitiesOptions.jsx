import React, { useCallback, useEffect, useState } from 'react'
import axiosInstance from '../axios/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherDataForCity, setCity } from '../store/WeatherSlice'
import { setCities } from '../store/CitySlice'

const CitiesOptions = ({ setShowCities }) => {

    const cities = useSelector(state => state.cities.cities)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const updateCities = useCallback(async () => {
        try {
            const result = await axiosInstance("/api/cities")
            dispatch(setCities(result.data))        
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false)
        }

    }, [])


    const handleCityChange = (city) => {
        setShowCities(false)
        dispatch(setCity(city))
        dispatch(fetchWeatherDataForCity(city))
    }

    useEffect(() => {
        if (!cities)
        {
            updateCities()
        } else {
            setLoading(false)
        }
            
    }, [])

    return (
        <div className="cities-options-container">
            {
                loading ? <div className="no-city">
                    Loading
                </div> :
                    cities.length > 0 ? (
                        cities.map(city => (
                            <div
                                onClick={() => handleCityChange(city)}
                                key={city}
                                className='city'>
                                {city}
                            </div>
                        )
                        )
                    ) : (
                        <div className="no-city">
                            No City Found
                        </div>
                    )
            }
        </div>
    )
}

export default CitiesOptions
