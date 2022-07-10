import * as React from "react";
import { Search as SearchIcon } from "react-feather";
import { ChangeEvent } from "react";

interface Search {
    onChange?: Function,
    collapse?: boolean, // TODO collapse search box to only the icon, and expand on typing or click
}

const Search = ({ onChange, collapse = false }: Search) => {
    return (
        <div className={ `absolute right-0 -top-8 w-40 h-6 flex flex-row items-center` }>
            <SearchIcon className={ "absolute left-0 w-4 h-4 mx-2" }/>
            <input id={ "search" }
                   className={ `pl-6 dark:bg-gray-900 w-full border-2 border-gray-500 rounded-xl outline-none focus:border-primaryPurple` }
                   onChange={ onChange !== undefined ? (event: ChangeEvent<HTMLInputElement>) => onChange(event) : undefined }/>
        </div>

    );
}

export default Search;
