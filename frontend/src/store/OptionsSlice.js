import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tempValue: "C"
}

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
      setTempValue: (state, action) => {
        state.tempValue = action.payload;
      }
    }
})


export const {setTempValue} = optionsSlice.actions

export default optionsSlice.reducer