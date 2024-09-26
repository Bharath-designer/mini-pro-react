import "../styles/TopBar.css"
import RoomIcon from '@mui/icons-material/Room';
import CitiesOptions from "./CitiesOptions";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTempValue } from "../store/OptionsSlice";
import { CircularProgress } from "@mui/material";
import { fetchWeatherDataForCity, setCity } from "../store/WeatherSlice";
import axiosInstance from "../axios";

const TopBar = () => {

    const [showCities, setShowCities] = useState(false)
    const city = useSelector((state) => state.weather.city);
    const tempValue = useSelector((state) => state.options.tempValue);
    const cityWeatherData = useSelector((state) => state.weather.cityWeatherData);
    const [cityLoading, setCityLoading] = useState(false)


    const toggleCities = () => {
        setShowCities(!showCities)
    }

    const listener = useRef()
    const dispatch = useDispatch()

    const changeTempValue = (value) => {
        dispatch(setTempValue(value))
    }

    useEffect(() => {
        if (showCities === true) {
            const clickListener = (e) => {
                const topbar = e.target.closest(".top-bar-wrapper")
                if (!topbar) {
                    setShowCities(false)
                }
            }
            document.addEventListener("click", clickListener)
            listener.current = clickListener
        } else {
            document.removeEventListener("click", listener.current)
        }

    }, [showCities])

    const getUserCityFromNavigator = () => {
        setCityLoading(true)
        navigator.geolocation.getCurrentPosition(
            (data) => {
                const url = `https://us1.locationiq.com/v1/reverse?key=pk.c5755bac19bed55bed2a5606af29a6d4&lat=${data.coords.latitude}&lon=${data.coords.longitude}&format=json`;
                axiosInstance(url)
                    .then((res) => {
                        dispatch(setCity(res.data.address.city))
                        dispatch(fetchWeatherDataForCity(res.data.address.city))
                    })
                    .catch(()=>{})
                    .finally(()=>{
                        setCityLoading(false)
                    })
                },
                (err) => {
                    setCityLoading(false)
                    if (err.code === 1) 
                        alert('Location permission denied')
                }
        )
    }

    return (

        <div className='top-bar-wrapper'>
            <div className="top-bar-content">

                <div onClick={toggleCities} className="search-btn">
                    {city || 'Search for cities'}
                </div>
                {cityLoading ? (
                    <button>
                        <CircularProgress color="white" size={'1.4em'} />
                    </button>
                ) :
                    <button onClick={getUserCityFromNavigator}>
                        <RoomIcon />
                    </button>
                }
                {showCities && <CitiesOptions setShowCities={setShowCities} />}
            </div>
            {cityWeatherData && <div className="options">
                <button onClick={() => changeTempValue('C')} className={`${tempValue === 'C' ? 'active' : ''}`}>C</button>
                <span>/</span>
                <button onClick={() => changeTempValue('F')} className={`${tempValue === 'F' ? 'active' : ''}`}>F</button>
            </div>}
        </div>
    )
}

export default TopBar
