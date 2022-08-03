import * as React from "react";

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
