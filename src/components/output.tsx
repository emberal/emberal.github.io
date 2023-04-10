import * as React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUp } from "react-feather";
import type { ChildProps, Component, TitleProps } from "../declarations/props";

interface InfoBoxProps extends TitleProps {
    error?: boolean,
}

export const InfoBox: Component<InfoBoxProps> = (
    {
        title = "",
        children,
        error = false,
        className
    }) => (
    <div className={ `border-rounded ${ error ? "border-red-500" : "border-gray-500" } ${ className }` }>
        <p className={ `border-b px-2 ${ error ? "border-red-500" : "border-gray-500" }` }>{ title }</p>
        <div className={ "mx-2" }>{ children }</div>
    </div>
);

interface MyDisclosureProps extends TitleProps {
    defaultOpen?: boolean,
    isOpen?: Function,
}

export const MyDisclosure: Component<MyDisclosureProps> = (
    {
        title,
        children,
        defaultOpen = false,
        className,
        id,
        isOpen
    }) => (
    <div id={ id } className={ `border-rounded dark:border-gray-900 default-bg default-text ${ className }` }>
        <Disclosure defaultOpen={ defaultOpen }>{ ({ open }) =>
            <>
                <Disclosure.Button onClick={ () => isOpen?.call(open) }
                                   className={ `flex-row-center w-full justify-between px-2` }>
                    <p className={ `py-1` }>{ title }</p>
                    <ChevronUp className={ `w-5 ${ open && "transform rotate-180" } transition` } />
                </Disclosure.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel>
                        <div className={ "px-2 pb-2 dark:text-gray-400 text-gray-600" }>{ children }</div>
                    </Disclosure.Panel>
                </Transition>
            </> }
        </Disclosure>
    </div>
);

export const MyDisclosureContainer: Component<ChildProps> = (
    {
        children,
        className
    }) => (
    <div className={ `dark:bg-gray-800 bg-gray-300 border-rounded dark:border-gray-800 p-2 mb-2
                                flex flex-col gap-1 ${ className }` }>
        { children }
    </div>
);
