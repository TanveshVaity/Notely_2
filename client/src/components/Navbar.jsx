import React, { Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = ({onOpen}) => {
    return (
        <Fragment>
            <div className="flex items-center justify-around h-[80px] bg-[#f6f4f4] shadow-md">
                <div className=" font-bold text-[#1e4f78] text-3xl">노틀리</div>
                <div className="flex gap-3">
                    <div className="pl-[24px] flex items-center gap-3 border border-[#42A5F5] rounded-lg h-[48px] bg-[#EEEEEE]">
                    <FaSearch/>
                    <input
                        className="bg-transparent w-[700px] outline-none placeholder-[#212121] opacity-80 font-bold"
                        placeholder="Search"
                    />
                    </div>
                    <div>
                        <button onClick={onOpen} className="flex gap-1 text-white items-center justify-center bg-[#42A5F5] hover:bg-[#2196F8] active: rounded-full h-[48px] w-[90px]">
                            <IoMdAdd />
                            Add
                        </button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-4">
                        <button className="text-white items-center justify-center bg-[#1e4f78] rounded-full h-[48px] w-[90px]">
                            Login
                        </button>
                        <button className="items-center justify-center border-[#1e4f78] text-[#1e4f78] border-2 hover:bg-[#1e4f78] hover:text-white active:bg-[#1e4f78] active:text-white rounded-full bg-slate-200 h-[48px] w-[90px]">
                             Sign up
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Navbar;
