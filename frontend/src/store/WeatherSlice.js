import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

const initialState = {
  city: null,
  cityWeatherData: null,
  status: 'idle',
  error: null,
};

export const fetchWeatherDataForCity = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city, { rejectWithValue }) => {
    try {
      const result = await axiosInstance(`/api/city/${city}`);
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchWeatherDataForCity.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(fetchWeatherDataForCity.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.cityWeatherData = action.payload; 
    })
    .addCase(fetchWeatherDataForCity.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  }
});

export const { setCity, setCityWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
