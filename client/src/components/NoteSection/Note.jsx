import { Fragment , useState} from "react";
import { MdEdit, MdDelete } from "react-icons/md";


const Note = ({note}) =>{
    const { title, content, category} = note;
    const maxWords = 6;
    const words = title.split(" ");
    const truncatedText = words.slice(0, maxWords).join(" ");

    const categoryColors = {
        Personal : "text-orange-900 bg-orange-200 ",
        Home : "text-green-900 bg-green-200",
        Buisness : "text-purple-900 bg-purple-200"
    }

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        console.log(isChecked);
    };

    return(
        <Fragment>
            <div className="relative w-[22rem] h-60 border p-4 rounded-xl bg-[#FAF9F6] shadow-lg">
                <div className="flex justify-between">
                    <span className={`text-sm text-bold border rounded-full h-full leading-9 w-24 text-center items-center ${isChecked ? "text-gray-900 bg-gray-400 opacity-35" : categoryColors[category]}`}>{category}</span>
                    <div className="flex gap-4 items-center text-gray-600">
                        <input onClick={handleCheckboxChange} className="h-5 w-5 bg-gray-600" type="checkbox"/>
                        <MdEdit size={20}/>  
                        <MdDelete size={20}/>
                    </div>
                </div>
                <p className={`mt-3 text-bold text-lg ${isChecked && "line-through text-gray-900 opacity-35"}`}>{truncatedText} {title.split(" ").length > 6 && "..."}</p>
                <p className={`mt-3 text-sm ${isChecked && "line-through text-gray-900 opacity-35"}`}>{content}</p>
                <span className="absolute bottom-3 right-3 text-sm text-gray-500">20.01.2023</span>
            </div>
        </Fragment>
    )
}

export default Note;