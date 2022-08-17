import * as React from "react";
import { Search as SearchIcon, X } from "react-feather";
import { ChangeEvent } from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Input from "./input";

interface Search {
    onChange?: Function,
    collapse?: boolean,
    searchWithoutFocus?: boolean,
    className?: string,
}

const Search = ({ onChange, collapse = false, searchWithoutFocus = false, className }: Search) => {

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
                if (isMounted && element && !element.matches(":focus")) {

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
        if (element) {
            element.value = "";
            if (onChange) {
                element.focus();
                onChange();
            }
        }
    }

    const iconClasses = "sm:w-4 sm:h-4 h-5 w-5";

    return (
        <div className={ `absolute right-0 flex -top-24 sm:-top-9 flex-row items-center` }>
            <Input id={ "search" }
                   type={ "text" }
                   name={ "search" }
                   placeholder={ t("search") }
                   className={ `sm:pl-6 pl-7 ${ collapse && !searched ? "focus:w-40 sm:w-6 w-8" : "w-40" }
                    rounded-xl shadow-sm shadow-primaryPurple transition-all duration-200 ease-in-out h-10 sm:h-7 ${ className }` }
                   onChange={ onChange ? (event: ChangeEvent<HTMLInputElement>) => onChange(event) : undefined }
                   leading={
                       <button className={ `absolute mx-[0.40rem]` }
                               onClick={ focusSearch }
                               title={ t("search") }>
                           <p className={ "hidden" }>{ t("search") }</p>
                           <SearchIcon className={ iconClasses }/>
                       </button> }
                   trailing={
                       searched ?
                           <button className={ `absolute right-0 mr-1 p-1` } onClick={ clearSearch }
                                   title={ t("clear") }>
                               <X className={ iconClasses }/>
                           </button>
                           : undefined
                   }
            /></div>
    );
};

export default Search;
