import * as React from "react";
import { Search as SearchIcon, X } from "react-feather";
import { ChangeEvent } from "react";

interface Search {
    onChange?: Function,
    collapse?: boolean,
    searchWithoutFocus?: boolean,
}

const Search = ({ onChange, collapse = false, searchWithoutFocus = false }: Search) => {

    const [searched, setSearched] = React.useState(false);

    function getSearchElement(): HTMLInputElement | null {
        return document.getElementById("search") as HTMLInputElement | null;
    }

    React.useEffect(() => {
        const element = getSearchElement();
        if (searchWithoutFocus) {
            let isMounted = true;

            function keyboardListener(keyboardEvent: KeyboardEvent) {
                if (element !== null && keyboardEvent.key !== "Enter" && !element.matches(":focus")) {

                    element.focus();
                    element.value += keyboardEvent.key;
                    if (onChange) {
                        onChange();
                    }
                }

                // Used to exit the box with 'Escape'
                document.addEventListener("keyup", keyUpEvent => {
                    if (keyUpEvent.key === "Escape") {
                        element?.blur();
                    }
                });
            }

            document.addEventListener("keypress", keyboardEvent => keyboardListener(keyboardEvent));

            return () => {
                document.removeEventListener("keypress", keyboardEvent => keyboardListener(keyboardEvent));
                document.removeEventListener("keyup", () => null);
                isMounted = false;
            };
        }

    }, []);

    React.useEffect(() => {
        const element = getSearchElement();
        setSearched(element?.value !== "");
    }, [onChange])

    /**
     * Focuses the searchbar
     */
    function focusSearch() {
        const element = getSearchElement();
        element?.focus();
    }

    /**
     * Removes all text from the search bar
     */
    function clearSearch() {
        const element = getSearchElement();
        if (element !== null) {
            element.value = "";
            if (onChange) {
                onChange();
            }
        }
    }

    return (
        <div className={ `absolute right-0 sm:-top-8 -top-[5.5rem] h-6 flex flex-row items-center` }>
            <SearchIcon className={ `absolute left-0 w-4 h-4 mx-[0.40rem]` } onClick={ focusSearch }/>
            <input id={ "search" }
                   className={ `pl-6 dark:bg-gray-900 ${ collapse && !searched ? "focus:w-40 w-6" : "w-40" } border-2 border-gray-500 
                   rounded-xl outline-none focus:border-primaryPurple shadow-sm shadow-primaryPurple 
                   transition-all duration-200 ease-in-out` }
                   onChange={ onChange !== undefined ? (event: ChangeEvent<HTMLInputElement>) => onChange(event) : undefined }/>
            {
                searched ?
                    <X className={ `absolute right-0 w-4 h-4 mr-2 cursor-pointer` } onClick={ clearSearch }/> : null
            }
        </div>

    );
};

export default Search;
