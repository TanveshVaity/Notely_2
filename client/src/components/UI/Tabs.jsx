import { Fragment , useState} from "react";
import NoteList from "../NoteSection/NoteList";
import  {useSelector} from "react-redux"

const Tabs = ({ notes, isChecked }) => {
  const completedNotes = useSelector(state => state.note.completedNotes);
  const [activeTab, setActiveTab] = useState("all");

  const handleChangeTabs = (tab) => {
    setActiveTab(tab);
  };

  const getNotesForTab = () => {
    switch (activeTab) {
      case "all":
        return isChecked ? notes.filter(note => note.completed) : notes;
      case "home":
        return isChecked ? completedNotes.filter(note => note.category === "Home") : notes.filter(note => note.category === "Home");
      case "buisness":
        return isChecked ? completedNotes.filter(note =>  note.category === "Buisness") : notes.filter(note => note.category === "Buisness");
      case "personal":
        return isChecked ? completedNotes.filter(note =>  note.category === "Personal") : notes.filter(note => note.category === "Personal");
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
            handleChangeTabs("buisness");
          }}
        >
          BUISNESS
        </button>
        <NoteList notes={getNotesForTab()} isChecked={isChecked} />
      </div>
    </Fragment>
  );
};

export default Tabs;
