import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

import { useSelector } from "react-redux";
import { auth, db } from "../Firebase";


function Form() {
  const theme = useSelector((store) => store.app.value); // Get theme state

  const [input, setinput] = useState({
    title: "",
    note: "",
  });

  console.log(input.title);
  function handlechange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setinput({ ...input, [name]: value });

    console.log(input);
  }

  async function handlesubmit(e) {
    e.preventDefault();
    // console.log(input);

    await addDoc(collection(db, "notes"), {
      title: input.title,
      note: input.note,
      createdBy:auth.currentUser?.email,
      createdAt: serverTimestamp(),
    });
  }

  return (
    <div
      className={`h-[25rem] w-[23rem] absolute bottom-16 right-32 z-50 rounded-2xl shadow-xl p-6 flex flex-col gap-6 transition-all ${
        theme ? "bg-gray-900 text-white" : "bg-white text-gray-700"
      }`}
    >
      {/* Title */}
      <h2 className="text-xl font-semibold flex justify-between">
        Create Your Note
      </h2>

      {/* Form Fields */}
      <form
        className="flex flex-col gap-4"
        onSubmit={handlesubmit}
        method="post"
      >
        <input
          type="text"
          placeholder="Enter The Title"
          name="title"
          onChange={handlechange}
          value={input.title}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            theme
              ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
              : "border-gray-300 bg-white text-black focus:ring-blue-400"
          }`}
        />
        <textarea
          placeholder="Your Note..."
          name="note"
          onChange={handlechange}
          value={input.note}
          className={`w-full p-3 border rounded-lg resize-none h-40 focus:outline-none focus:ring-2 ${
            theme
              ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
              : "border-gray-300 bg-white text-black focus:ring-blue-400"
          }`}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg transition-all ${
            theme
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Form;
