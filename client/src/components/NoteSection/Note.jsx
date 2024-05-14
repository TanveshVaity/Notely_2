import { Fragment, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { updateNoteCompleted} from "../../features/note/noteSlice";
import NoteForm from "./NoteForm";
import Backdrop from "../UI/Backdrop";
import DeleteForm from "../UI/DeleteForm";

const Note = ({ note }) => {
    const dispatch = useDispatch();    
    const { id, title, content, category } = note;
    const maxWords = 6;
    const words = title.split(" ");
    const truncatedText = words.slice(0, maxWords).join(" ");
    const categoryColors = {
        Personal: "text-orange-900 bg-orange-200",
        Home: "text-green-900 bg-green-200",
        Buisness: "text-purple-900 bg-purple-200"
    };
    const [isCompleted, setIsCompleted] = useState(false);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);

    const handleCheckCompleted = () => {
        setIsCompleted(!isCompleted);
        dispatch(updateNoteCompleted({ noteId: id, isCompleted: !isCompleted }));
    };

    const handleEditNote = () => {
        setIsEditFormVisible(true);
    };

    const handleDeleteNote = () => {
        setIsDeleteFormVisible(true);
    }

    const handleCloseEditForm = () => {
        setIsEditFormVisible(false);
    };

    const handleCloseDeleteForm = () => {
        setIsDeleteFormVisible(false);
    };


    return (
        <Fragment>
            <div className="relative w-[22rem] h-60 border p-4 rounded-xl bg-[#FAF9F6] shadow-lg">
                <div className="flex justify-between">
                    <span
                        className={`text-sm text-bold border rounded-full h-full leading-9 w-24 text-center items-center ${
                        isCompleted 
                            ? "text-gray-900 bg-gray-400 opacity-35"
                            : categoryColors[category]
                        }`}
                    >
                        {category}
                    </span>
                    <div className="flex gap-4 items-center text-gray-600">
                        <input
                            onClick={handleCheckCompleted}
                            className="h-5 w-5 bg-gray-600"
                            type="checkbox"
                            checked={isCompleted}
                        />
                        <MdEdit size={20} onClick={handleEditNote} />
                        <MdDelete size={20}  onClick={handleDeleteNote}/>
                        {isDeleteFormVisible && (
                            <Backdrop isOpen={isDeleteFormVisible} onClose={handleCloseDeleteForm}>
                                <DeleteForm onClose={handleCloseDeleteForm} id={id}/>
                            </Backdrop>
                        )}
                    </div>
                </div>
                <p
                    className={`mt-3 text-bold text-lg ${
                        isCompleted && "line-through text-gray-900 opacity-35"
                    }`}
                >
                    {truncatedText} {title.split(" ").length > 6 && "..."}
                </p>
                <p
                    className={`mt-3 text-sm ${
                        isCompleted && "line-through text-gray-900 opacity-35"
                    }`}
                >
                    {content}
                </p>
                <span className="absolute bottom-3 right-3 text-sm text-gray-500">
                    20.01.2023
                </span>
            </div>
            {isEditFormVisible && (
                <Backdrop isOpen={isEditFormVisible} onClose={handleCloseEditForm}>
                    <NoteForm onClose={handleCloseEditForm} type="edit" category={category} noteId={id} note={note}/>
                </Backdrop>
            )}
        </Fragment>
    );
};

export default Note;
