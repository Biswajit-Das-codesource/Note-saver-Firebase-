import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import { IoMdCreate } from "react-icons/io";
import Form from "./Form";
import { MdOutlineCancel } from "react-icons/md";
import { collection, onSnapshot, query, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import Login from "./Login";

function Body() {
  const user = useSelector((store) => store.app.user);
  const theme = useSelector((store) => store.app.value);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map((e) => ({ ...e.data(), id: e.id }));
      const currentUserEmail = auth.currentUser?.email;
      const currentUserNotes = notes.filter((e) => e.createdBy === currentUserEmail);
      setNotes(currentUserNotes);
    });

    return () => unsubscribe();
  }, []);

  // Function to handle deleting the note
  const handleDelete = async (noteId) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      console.log("Note deleted successfully");
    } catch (err) {
      console.error("Error deleting note: ", err);
    }
  };

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div
          className={`h-screen w-full ${
            theme ? "bg-slate-950" : "bg-white"
          } flex flex-col items-center py-16 px-4 overflow-x-hidden overflow-y-auto scroll-smooth`}
        >
          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {notes.map((e) => {
              return <NoteCard key={e.id} value={e} onDelete={handleDelete} />;
            })}
          </div>

          {/* Header Text */}
          <h1
            className={`mt-10 text-center text-4xl md:text-6xl lg:text-7xl font-bold ${
              theme ? "text-slate-600" : "text-black"
            } absolute`}
          >
            Keep it here.
          </h1>

       
          {showForm && <Form setShowForm={setShowForm} />}

          {/* Create Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 text-black text-xl p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-all z-50"
          >
            {showForm ? <MdOutlineCancel size={"2.5rem"} /> : <IoMdCreate size={"2.5rem"} />}
          </button>
        </div>
      )}
    </>
  );
}

export default Body;
