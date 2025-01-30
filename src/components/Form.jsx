import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { auth, db } from "../Firebase";

function Form({ setShowForm }) {
  const theme = useSelector((store) => store.app.value); // Get theme state

  const [input, setInput] = useState({
    title: "",
    note: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.title.trim() || !input.note.trim()) return; // Prevent empty submissions

    await addDoc(collection(db, "notes"), {
      title: input.title,
      note: input.note,
      createdBy: auth.currentUser?.email,
      createdAt: serverTimestamp(),
    });

    setShowForm(false); // Close form after submission
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`w-[90%] max-w-lg p-6 sm:p-10 rounded-lg shadow-lg transition-all relative ${
          theme ? "bg-gray-900 text-white" : "bg-white text-gray-700"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={() => setShowForm(false)}
        >
          <MdCancel size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-4">Create Your Note</h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter The Title"
            name="title"
            onChange={handleChange}
            value={input.title}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              theme
                ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-black focus:ring-blue-400"
            }`}
            required
          />
          <textarea
            placeholder="Your Note..."
            name="note"
            onChange={handleChange}
            value={input.note}
            className={`w-full p-3 border rounded-lg resize-none h-40 focus:outline-none focus:ring-2 ${
              theme
                ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-black focus:ring-blue-400"
            }`}
            required
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
    </div>
  );
}

export default Form;
