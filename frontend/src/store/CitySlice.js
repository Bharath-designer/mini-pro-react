import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cities: null
}

const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
      setCities: (state, action) => {
        state.cities = action.payload;
      }
    }
})


export const {setCities} = citiesSlice.actions

export default citiesSlice.reducer