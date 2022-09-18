import * as React from "react";
import { Menu } from "@headlessui/react";

interface MyMenu {
    title?: string,
    button?: React.ReactNode,
    items?: React.ReactNode,
    buttonClassName?: string,
    itemsClassName?: string,
}

export default function MyMenu(
    {
        title,
        button,
        items,
        buttonClassName,
        itemsClassName,
    }: MyMenu): JSX.Element {
    return ( // TODO transition
        <Menu>
            <Menu.Button title={ title } className={ `flex-row-center ${ buttonClassName }` }>
                { button }
            </Menu.Button>
            <Menu.Items
                className={ `absolute default-bg border border-gray-500 rounded-b-xl mt-1 w-max z-50 ${ itemsClassName }` }>
                <div className={ "mx-1" }>{ items }</div>
            </Menu.Items>
        </Menu>
    )
};
