import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import { IoMdCreate } from "react-icons/io";
import Form from "./Form";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../Firebase";
import Login from "./Login";
import { current } from "@reduxjs/toolkit";

function Body() {
  const user = useSelector((store) => store.app.user);

  console.log(user)

  const theme = useSelector((store) => store.app.value);
  // const user= useSelector((store)=>store.app.user)
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
 

  const [notes, setnotes] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map((e) => ({ ...e.data(), id: e.id }));
     const curnotes = auth.currentUser?.email  
      const currentUser=notes.filter(e=>e.createdBy === curnotes)
      console.log(currentUser)

   
      setnotes(currentUser);
    });
  }, []);


  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div
          className={`h-screen w-full ${
            theme ? "bg-slate-950" : "bg-white"
          } flex gap-14 flex-wrap overflow-y-auto scroll-smooth hide-scrollbar justify-center py-20 items-start snap-y snap-mandatory`}
        >
          {notes.map((e) => {
            return <NoteCard value={e} />;
          })}

          <h1
            className={`absolute top-60 left-[28%] text-8xl ${
              theme ? "text-slate-600" : "text-black"
            } font-bold`}
          >
            Keep it here.
          </h1>

          {/* Show Form if toggled */}
          {showForm && <Form setShowForm={setShowForm} />}

          {/* Create Button to toggle form */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-black text-xl p-3 absolute bottom-11 right-14 bg-white rounded-full shadow-lg hover:scale-105 transition-all z-999"
          >
            {showForm ? (
              <MdOutlineCancel size={"2.5rem"} />
            ) : (
              <IoMdCreate size={"2.5rem"} />
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default Body;
