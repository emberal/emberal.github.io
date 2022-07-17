import * as React from "react";
import { Search as SearchIcon, X } from "react-feather";
import { ChangeEvent } from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Input from "./input";

interface Search {
    onChange?: Function,
    collapse?: boolean,
    searchWithoutFocus?: boolean,
}

const Search = ({ onChange, collapse = false, searchWithoutFocus = false }: Search) => {

    const { t } = useTranslation();

    const [searched, setSearched] = React.useState(false);

    function getSearchElement(): HTMLInputElement | null {
        return document.getElementById("search") as HTMLInputElement | null;
    }

    React.useEffect(() => {
        const element = getSearchElement();
        if (searchWithoutFocus) {
            let isMounted = true;

            function keyboardListener(keyboardEvent: KeyboardEvent) {
                if (isMounted && element !== null && !element.matches(":focus")) {

                    element.focus();
                    if (keyboardEvent.key !== "Enter") {
                        element.value += keyboardEvent.key;
                    }
                    if (onChange) {
                        onChange();
                    }
                }

                // Used to exit the box with 'Escape'
                document.addEventListener("keyup", keyUpEvent => {
                    if (isMounted && keyUpEvent.key === "Escape") {
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
                element.focus();
                onChange();
            }
        }
    }

    return (
        <div className={ `absolute right-0 sm:-top-9 -top-24 sm:h-7 h-10 flex flex-row items-center` }>
            <button className={ `absolute left-0 mx-[0.40rem]` } onClick={ focusSearch } title={ t("search") }>
                <SearchIcon className={ "sm:w-4 sm:h-4 h-5 w-5" }/>
            </button>
            <Input id={ "search" }
                   className={ `sm:pl-6 pl-7 ${ collapse && !searched ? "focus:w-40 sm:w-6 w-8" : "w-40" }
                    rounded-xl shadow-sm shadow-primaryPurple transition-all duration-200 ease-in-out h-full` }
                   onChange={ onChange ? (event: ChangeEvent<HTMLInputElement>) => onChange(event) : undefined }/>
            {
                searched ?
                    <button className={ `absolute right-0 mr-1 p-1` } onClick={ clearSearch } title={ t("clear") }>
                        <X className={ "sm:w-4 sm:h-4 h-5 w-5" }/>
                    </button>
                    : null
            }
        </div>

    );
};

export default Search;
