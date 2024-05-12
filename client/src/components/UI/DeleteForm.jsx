import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import {useDispatch} from "react-redux";
import { deleteNote } from "../../features/note/noteSlice";

const DeleteForm = ({id}) =>{
    const dispatch = useDispatch();
    const handleDeleteNote = () =>{
        dispatch(deleteNote(id));
    }
    return(
        <Fragment>
            <div className="min-h-screen flex items-center justify-center">
                <form className="w-full max-w-sm">
                    <div className="h-[200px] w-[402px] p-6 rounded-2xl border flex flex-col justify-between bg-white">
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-bold text-2xl">Delete Note</span>
                            <IoMdClose className="text-gray-600 cursor-pointer" />
                        </div>
                        <p>Are you sure you want to delete this note ?</p>
                        <div className="flex justify-end gap-3 pt-3">
                            <button className="text-gray-500" >Cancel</button>
                            <button onClick={handleDeleteNote} className="flex gap-1 text-white items-center justify-center bg-red-500 hover:bg-red-600 active: rounded-full h-[40px] w-[80px]">
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default DeleteForm;