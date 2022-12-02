import * as React from "react";
import { Menu } from "@headlessui/react";
import { TitleComponent } from "../interfaces/interfaces";

interface MyMenu extends TitleComponent {
    button?: React.ReactNode,
    buttonClassName?: string,
    itemsClassName?: string,
}

export default function MyMenu(
    {
        title,
        button,
        children,
        id,
        className,
        buttonClassName,
        itemsClassName,
    }: MyMenu): JSX.Element {
    return ( // TODO transition
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
}
