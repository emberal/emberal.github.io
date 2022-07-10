import * as React from "react";
import { Search as SearchIcon } from "react-feather";

interface Search {
    onChange?: Function,
}

const Search = ({ onChange }: Search) => {
    return (
        <div className={ `absolute right-0 -top-8 w-40 h-6 flex flex-row items-center` }>
            <SearchIcon className={ "absolute left-0 text-black w-5 h-5 mx-1" }/>
            <input id={ "search" }
                   className={ `pl-6 text-black w-full border-2 rounded-xl outline-none focus:border-primaryPurple` }
                   onChange={ onChange !== undefined ? (event) => onChange(event) : undefined }/>
        </div>

    );
}

export default Search;
