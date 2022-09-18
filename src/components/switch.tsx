import { Switch } from "@headlessui/react";
import * as React from "react";
import { TitleComponent } from "../interfaces/interfaces";

interface Switch extends TitleComponent {
    onChange?: (bool: boolean) => boolean,
    checked?: boolean,
}

export default function MySwitch({ onChange, checked = true, title, name, className }: Switch):JSX.Element {

    return (
        <Switch checked={ checked }
                onChange={ bool => onChange ? onChange(bool) : null }
                title={ title }
                className={ `${ checked ? "bg-primaryPurple" : "bg-gray-500" } 
                                       relative inline-flex h-6 w-11 items-center rounded-full my-2 ${ className }` }>
            <span className={ "sr-only" }>{ name }</span>
            <span className={ `${ checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-all` }
            />
        </Switch>
    );
}
