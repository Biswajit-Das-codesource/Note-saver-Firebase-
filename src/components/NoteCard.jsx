import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

function NoteCard({ value }) {
  // Function to handle the download of the note as a .txt file
  const handleDownload = () => {
    const noteContent = `Title: ${value.title}\n\nNote:\n${value.note}`;
    const blob = new Blob([noteContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${value.title || "untitled"}.txt`; // Use the title as filename, fallback to "untitled"
    link.click();
  };

  return (
    <div className="h-70 rounded-[50px] w-56 bg-zinc-900 text-white z-40 overflow-hidden cursor-pointer hover:scale-106 transition-transform duration-300 ">
      <HiOutlineDocumentText className="ml-5 mt-5" size={"1.8rem"} />
      <div className="h-1/2 w-full whitespace-pre-line text-ellipsis overflow-y-clip">
        <p className="text-ellipsis text-sm font-semibold text-left mt-3 px-2">
          {value.title}
          <br />
          {value.note}
        </p>
      </div>
      <div className="items h-8 w-full flex gap-4 justify-end items-center px-4">
        <MdCancel size={"1.5rem"} />
      </div>
      <div
        className="h-12 w-full bg-green-400 flex justify-center items-center cursor-pointer"
        onClick={handleDownload}
      >
        <p className="text-center text-xl font-medium text-slate-900">Download</p>
      </div>
    </div>
  );
}

export default NoteCard;
