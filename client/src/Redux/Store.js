import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./Slices/TaskSlice";
export const store = configureStore({
    reducer:{
        task:TaskReducer
    }
}) 
export default store;