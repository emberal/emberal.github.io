import * as React from "react";
import { Search as SearchIcon, X } from "react-feather";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Input from "./input";
import type { Component } from "../interfaces/interfaces";

interface Search extends Component {
    onChange?: () => void,
    collapse?: boolean,
    searchWithoutFocus?: boolean,
}

export default function Search(
    {
        onChange,
        collapse = false,
        searchWithoutFocus = false,
        className,
        id
    }: Search): JSX.Element {

    const { t } = useTranslation();

    /**
     * Is 'true' if the searchbox is not empty
     */
    const [searched, setSearched] = React.useState(false);

    function getSearchElement(): HTMLInputElement | null {
        return document.getElementById("search") as HTMLInputElement | null;
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
                document.addEventListener("keyup", keyUpEvent => blurElement(keyUpEvent));
            }

            function blurElement(keyUpEvent: KeyboardEvent): void {
                if (isMounted && keyUpEvent.key === "Escape") {
                    element?.blur();
                }
            }

            document.addEventListener("keypress", keyboardEvent => keyboardListener(keyboardEvent));

            return () => {
                document.removeEventListener("keypress", keyboardEvent => keyboardListener(keyboardEvent));
                document.removeEventListener("keyup", keyUpEvent => blurElement(keyUpEvent));
                isMounted = false;
            };
        }

    }, []);

    React.useEffect(() => {
        const notEmpty = getSearchElement()?.value !== "";
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
        <div className={ `absolute right-0 -top-24 sm:-top-9` } id={ id }>
            <Input id={ "search" }
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
                           <SearchIcon className={ iconClasses }/>
                       </button> }
                   trailing={
                       searched ?
                           <button className={ `absolute right-0 mr-1 p-1` } onClick={ clearSearch }
                                   title={ t("clear") ?? undefined }>
                               <X className={ iconClasses }/>
                           </button>
                           : undefined
                   }
            />
        </div>
    );
}
