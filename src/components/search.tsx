import * as React from "react";
import { Search as SearchIcon, X } from "react-feather";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Input from "./input";
import type { Component, ComponentProps } from "../declarations/props";
import { getElementById } from "../utils/dom";

interface SearchProps extends ComponentProps {
    onChange?: () => void,
    collapse?: boolean,
    searchWithoutFocus?: boolean,
}

const Search: Component<SearchProps> = (
    {
        onChange,
        collapse = false,
        searchWithoutFocus = false,
        className,
        id = "search",
    }) => {

    const { t } = useTranslation();

    // Is 'true' if the searchbox is not empty
    const [searched, setSearched] = React.useState(false);

    function getSearchElement(): HTMLInputElement | null {
        return getElementById(id);
    }

    React.useEffect(() => {
        if (searchWithoutFocus) {
            const element = getSearchElement();
            let isMounted = true;

            function keyboardListener(keyboardEvent: KeyboardEvent): void {
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
                document.addEventListener("keyup", blurElement);
            }

            function blurElement(keyUpEvent: KeyboardEvent): void {
                if (isMounted && keyUpEvent.key === "Escape") {
                    element?.blur();
                }
            }

            document.addEventListener("keypress", keyboardListener);

            return () => {
                document.removeEventListener("keypress", keyboardListener);
                document.removeEventListener("keyup", blurElement);
                isMounted = false;
            };
        }

    }, []);

    React.useEffect(() => {
        const element = getSearchElement();
        const notEmpty = element?.value !== "";
        if (notEmpty !== searched) {
            setSearched(notEmpty);
        }
    }, [onChange])

    /**
     * Focuses the searchbar
     */
    function focusSearch(): void {
        getSearchElement()?.focus();
    }

    /**
     * Removes all text from the search bar
     */
    function clearSearch(): void {
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
        <div className={ `absolute right-0 -top-24 sm:-top-9` }>
            <Input id={ id }
                   type={ "search" }
                   name={ "search" }
                   placeholder={ t("search") }
                   className={ `sm:pl-6 pl-7 ${ collapse && !searched ? "focus:w-40 sm:w-6 w-8" : "w-40" }
                    rounded-xl shadow-sm shadow-primaryPurple transition-all duration-200 ease-in-out h-10 sm:h-7 ${ className }` }
                   onChange={ onChange }
                   leading={
                       <button className={ `absolute mx-[0.40rem]` }
                               onClick={ focusSearch }
                               title={ t("search") + " (Enter)" }>
                           <p className={ "hidden" }>{ t("search") }</p>
                           <SearchIcon className={ iconClasses } />
                       </button> }
                   trailing={
                       searched ?
                           <button className={ `absolute right-0 mr-1 p-1` } onClick={ clearSearch }
                                   title={ t("clear") ?? undefined }>
                               <X className={ iconClasses } />
                           </button>
                           : undefined
                   }
            />
        </div>
    );
};

export default Search;
