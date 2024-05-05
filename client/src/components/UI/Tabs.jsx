import { Fragment, useState } from "react";
import NoteList from "../NoteSection/NoteList";

const Tabs = ({ notes }) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleChangeTabs = (tab) => {
    setActiveTab(tab);
  };

  const getNotesForTab = () => {
    switch (activeTab) {
      case "all":
        return notes;
      case "home":
        return notes.filter((note) => note.category === "Home");
      case "business":
        return notes.filter((note) => note.category === "Business");
      case "personal":
        return notes.filter((note) => note.category === "Personal");
      default:
        return [];
    }
  };

  return (
    <Fragment>
      <div>
        <button
          className={`text-sm px-6 py-2 ${
            activeTab === "all"
              ? "border-b-blue-400 border-b-[3px] text-blue-400"
              : "border-b-gray-400 border-b-[3px] text-gray-400"
          }`}
          onClick={() => {
            handleChangeTabs("all");
          }}
        >
          ALL
        </button>
        <button
          className={`text-sm px-6 py-2 ${
            activeTab === "personal"
              ? " border-b-blue-400 border-b-[3px] text-blue-400"
              : "border-b-gray-400 border-b-[3px] text-gray-400"
          }`}
          onClick={() => {
            handleChangeTabs("personal");
          }}
        >
          PERSONAL
        </button>
        <button
          className={`text-sm px-6 py-2 ${
            activeTab === "home"
              ? " border-b-blue-400 border-b-[3px] text-blue-400"
              : "border-b-gray-400 border-b-[3px] text-gray-400"
          }`}
          onClick={() => {
            handleChangeTabs("home");
          }}
        >
          HOME
        </button>
        <button
          className={`text-sm px-6 py-2 ${
            activeTab === "business"
              ? " border-b-blue-400 border-b-[3px] text-blue-400"
              : "border-b-gray-400 border-b-[3px] text-gray-400"
          }`}
          onClick={() => {
            handleChangeTabs("business");
          }}
        >
          BUSINESS
        </button>
        <NoteList notes={getNotesForTab()} />
      </div>
    </Fragment>
  );
};

export default Tabs;