import { Switch } from "@headlessui/react";
import * as React from "react";

interface Switch {
    onChange?: any,
    checked?: boolean,
    title?: string,
    name?: string,
    className?: string,
}

const MySwitch = ({ onChange, checked = true, title, name, className }: Switch) => {

    return (
        <Switch checked={ checked }
                onChange={ (bool: boolean) => onChange(bool) }
                title={ title }
                className={ `${ checked ? "bg-primaryPurple" : "bg-gray-500" } 
                                       relative inline-flex h-6 w-11 items-center rounded-full my-2 ${ className }` }>
            <span className={ "sr-only" }>{ name }</span>
            <span className={ `${ checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-all` }
            />
        </Switch>
    )
};

export default MySwitch;
