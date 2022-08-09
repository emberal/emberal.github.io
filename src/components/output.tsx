import * as React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "react-feather";

interface InfoBox {
    title?: string,
    content?: string,
    error?: boolean,
    className?: string,
}

export const InfoBox = ({ title = "", content = "", error = false, className }: InfoBox) => {
    return (
        <div className={ `border rounded-lg ${ error ? "border-red-500" : "border-gray-500" } ${ className }` }>
            <p className={ `border-b px-2 ${ error ? "border-red-500" : "border-gray-500" }` }>{ title }</p>
            <p className={ "px-2" }>{ content }</p>
        </div>
    )
};

interface MyDisclosure {
    title: string,
    content: React.ReactElement<HTMLElement>,
    defaultOpen?: boolean,
    className?: string,
    id?: string,
    isOpen?: Function,
}

export const MyDisclosure = ({ title, content, defaultOpen = false, className, id, isOpen }: MyDisclosure) => {
    return (
        <div id={ id } className={ `border-rounded dark:border-gray-900 bg-standard text-standard ${ className }` }>
            <Disclosure defaultOpen={ defaultOpen }>
                { ({ open }) => (
                    <>
                        <Disclosure.Button onClick={ isOpen ? () => isOpen(open) : undefined }
                                           className={ `flex flex-row items-center w-full justify-between px-2` }>
                            <p className={ `py-1` }>{ title }</p>
                            <ChevronUp className={ `w-5 ${ open && "transform rotate-180" } transition` }/>
                        </Disclosure.Button>
                        { /*TODO try to make Transition work, creates problems for table margin!*/ }
                        <Disclosure.Panel>
                            <div className={ "px-2 pb-2 dark:text-gray-400 text-gray-600" }>{ content }</div>
                        </Disclosure.Panel>
                    </>
                ) }
            </Disclosure>
        </div>
    )
};