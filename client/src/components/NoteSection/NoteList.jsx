import { Fragment } from "react";
import Note from "./Note";

const NoteList = ({ notes, isChecked }) => {
    return (
        <Fragment>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4">
                {notes.map((note, index) => (
                    <Note key={index} note={note} isChecked={isChecked}/>
                ))}
            </div>
        </Fragment>
    );
}

export default NoteList;
