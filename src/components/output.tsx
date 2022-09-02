import * as React from "react";
import { Disclosure, Transition } from "@headlessui/react";
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
        <div id={ id } className={ `border-rounded dark:border-gray-900 default-bg default-text ${ className }` }>
            <Disclosure defaultOpen={ defaultOpen }>
                { ({ open }) => (
                    <>
                        <Disclosure.Button onClick={ isOpen ? () => isOpen(open) : undefined }
                                           className={ `flex flex-row items-center w-full justify-between px-2` }>
                            <p className={ `py-1` }>{ title }</p>
                            <ChevronUp className={ `w-5 ${ open && "transform rotate-180" } transition` }/>
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0">
                            <Disclosure.Panel>
                                <div className={ "px-2 pb-2 dark:text-gray-400 text-gray-600" }>{ content }</div>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                ) }
            </Disclosure>
        </div>
    )
};

interface MyDisclosureContainer {
    children: React.ReactNode,
    className?: string,
}

export const MyDisclosureContainer = ({ children, className }: MyDisclosureContainer): JSX.Element => {
    return (
        <div className={ `dark:bg-gray-800 bg-gray-300 border-rounded dark:border-gray-800 p-2 mb-2
                                flex flex-col gap-1 ${ className }` }>
            { children }
        </div>
    )
};
