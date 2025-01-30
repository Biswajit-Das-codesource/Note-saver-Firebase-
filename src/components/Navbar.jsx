import React, { useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../redux/Slicer";

function Navbar() {

    const value=useSelector((store)=>store.app.value)

    const user = useSelector((store)=>store.app.user)

    console.log(user)
    const dispatch = useDispatch()


    const [isDark,setisDark]=useState(true)
    
  return (
    <div className={`h-14 w-full ${value ? "bg-slate-950" : "bg-white"} flex justify-end items-center`}>
      <div className="items flex gap-4 mt-2 mr-4">
        <button className={`px-2 py-2 ${value ? "bg-white text-black" : "bg-slate-950 text-white"} flex justify-center items-center rounded-4xl font-medium gap-1 cursor-pointer`}>
          Give it a Star
          <FaGithub size={"1.5rem"} />
        </button>

        <button className={`${value ? "text-white" : "text-black"} cursor-pointer `} onClick={()=>dispatch(change(!value))}>
          {
           value ? <CiDark size={"2rem"} /> : <CiLight size={"2rem"}/>
          }

        </button>
      </div>
    </div>
  );
}

export default Navbar;
