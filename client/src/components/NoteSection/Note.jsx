import { Fragment } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const Note = () =>{
    const originalText = "Hang out with Marry in nisl nisi";
    const maxWords = 6;
    const words = originalText.split(" ");
    const truncatedText = words.slice(0, maxWords).join(" ");

    return(
        <Fragment>
            <div className="relative w-[22rem] h-60 border p-4 rounded-xl bg-[#FAF9F6] shadow-lg">
                <div className="flex justify-between">
                    <span className="text-sm border rounded-full h-full leading-9 w-24 text-center items-center">Personal</span>
                    <div className="flex gap-4 items-center text-gray-600">
                        <input className="h-5 w-5 bg-gray-600" type="checkbox"/>
                        <MdEdit size={20}/>  
                        <MdDelete size={20}/>
                    </div>
                </div>
                <p className="mt-3 text-bold text-lg">{truncatedText} {originalText.split(" ").length > 6 && "..."}</p>
                <p className="mt-3 text-sm">in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque </p>
                <span className="absolute bottom-3 right-3 text-sm text-gray-500">20.01.2023</span>
            </div>
        </Fragment>
    )
}

export default Note;