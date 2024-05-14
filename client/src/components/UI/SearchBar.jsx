import { Fragment, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    }
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          onSearch(query);
        }
    }
    

    return (
        <Fragment>
            <div className="pl-[24px] flex items-center gap-3 border border-[#42A5F5] rounded-lg h-[48px] bg-[#EEEEEE]">
                <FaSearch type="submit" />
                <input
                    className="bg-transparent w-[700px] outline-none placeholder-[#212121] opacity-80 font-bold"
                    placeholder="Search"
                    value={query}
                    onChange={handleChange}
                    onKeyUp={handleKeyPress}
                />
            </div>
        </Fragment>
    );
};

export default SearchBar;
