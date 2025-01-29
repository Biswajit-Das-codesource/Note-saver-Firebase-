import { createSlice } from "@reduxjs/toolkit";


const appslicer=createSlice({
    name:"theme",
    initialState:{
        value:true,
        user:null
    },
    reducers:{
        change:(state,action)=>{
            state.value=action.payload
        },
        setuser:(state,action)=>{
            state.user=action.payload
        }
    }
})


export const {change,setuser} = appslicer.actions
export default appslicer.reducer