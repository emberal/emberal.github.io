import * as React from "react";
import { Menu } from "@headlessui/react";
import type { Component, TitleProps } from "../declarations/props";

interface MyMenuProps extends TitleProps {
    button?: React.ReactNode,
    buttonClassName?: string,
    itemsClassName?: string,
}

const MyMenu: Component<MyMenuProps> = (
    {
        title,
        button,
        children,
        id,
        className,
        buttonClassName,
        itemsClassName,
    }) => ( // TODO transition
    <div className={ `${ className }` } id={ id }>
        <Menu>
            <Menu.Button title={ title ?? undefined } className={ `flex-row-center ${ buttonClassName }` }>
                { button }
            </Menu.Button>
            <Menu.Items
                className={ `absolute default-bg border border-gray-500 rounded-b-xl mt-1 w-max z-50 ${ itemsClassName }` }>
                <div className={ "mx-1" }>{ children }</div>
            </Menu.Items>
        </Menu>
    </div>
);

export default MyMenu;
