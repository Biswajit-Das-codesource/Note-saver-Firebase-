import { configureStore } from "@reduxjs/toolkit";
import appslicer from "./Slicer"

const appstore=configureStore({

    reducer:{
        app:appslicer
    }
   
})

export default appstore