import { Switch } from "@headlessui/react";
import * as React from "react";
import type { Component, TitleProps } from "../declarations/props";

interface MySwitchProps extends TitleProps {
    onChange?: React.Dispatch<React.SetStateAction<boolean>>,
    checked?: boolean,
}

const MySwitch: Component<MySwitchProps> = (
    {
        onChange,
        checked = true,
        title,
        name,
        className
    }) => (
    <Switch checked={ checked }
            onChange={ onChange }
            title={ title ?? undefined }
            className={ `${ checked ? "bg-primaryPurple" : "bg-gray-500" } 
                                       relative inline-flex h-6 w-11 items-center rounded-full my-2 ${ className }` }>
        <span className={ "sr-only" }>{ name }</span>
        <span className={ `${ checked ? 'translate-x-6' : 'translate-x-1' }
         inline-block h-4 w-4 transform rounded-full bg-white transition-all` } />
    </Switch>
);

export default MySwitch;
