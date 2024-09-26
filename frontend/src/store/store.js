import { configureStore } from '@reduxjs/toolkit';
import WeatherReducer from './WeatherSlice';
import OptionsReducer from './OptionsSlice';
import CityReducer from './CitySlice';

const store = configureStore({
  reducer: {
    weather: WeatherReducer,
    options: OptionsReducer,
    cities: CityReducer
  },
});

export default store;
