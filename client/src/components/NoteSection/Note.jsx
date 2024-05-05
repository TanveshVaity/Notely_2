import { Fragment, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addCompletedNote } from "../../features/note/noteSlice";

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

    const handleCheckCompleted = () => {
        setIsCompleted(!isCompleted);
        if (!isCompleted) {
            dispatch(addCompletedNote(note));
        } else {
            dispatch(removeCompletedNote(id));
        }
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
                        <MdEdit size={20} />
                        <MdDelete size={20} />
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
        </Fragment>
    );
};

export default Note;