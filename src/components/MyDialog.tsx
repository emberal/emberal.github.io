import { Dialog } from "@headlessui/react";
import * as React from "react";
import { TitleComponent } from "../interfaces/interfaces";
import { MouseEventHandler } from "react";

interface MyDialog extends TitleComponent {
    description?: string,
    button?: React.ReactNode,
    acceptButtonName?: string,
    cancelButtonName?: string,
    callback?: MouseEventHandler<HTMLButtonElement>,
    buttonClasses?: string,
    buttonTitle?: string
}

export default function MyDialog(
    {
        title,
        description,
        button,
        acceptButtonName = "Ok",
        cancelButtonName = "Cancel",
        children,
        callback,
        className,
        buttonClasses,
        buttonTitle,
        id,
    }: MyDialog): JSX.Element {

    const [isOpen, setIsOpen] = React.useState(false);

    function callbackAndClose(e: React.MouseEvent<HTMLButtonElement>) {
        if (callback) {
            callback(e);
        }
        setIsOpen(false);
    }

    React.useEffect(() => {
        setIsOpen(false);
    }, [callback]);

    return (
        <div className={ "w-fit h-fit" }>
            <button onClick={ () => setIsOpen(true) } className={ buttonClasses } title={ buttonTitle }>
                { button }
            </button>
            { /*TODO fix not centered when scrolling and remove "hack"*/ }
            <Dialog open={ isOpen } onClose={ () => setIsOpen(false) }
                    className={ `absolute m-auto w-full h-screen flex justify-content [top:calc(-50vh+50%);] z-50 ${ className }` }
                    id={ id }>

                <div className={ "fixed inset-0 bg-black/40" /*Backdrop*/ } aria-hidden={ true }/>

                <div className={ "inline-flex items-center mx-auto" }>
                    <Dialog.Panel
                        className={ "w-fit relative default-bg default-text-black-white border-rounded border-gray-500 p-2" }>
                        <Dialog.Title className={ "text-2xl border-b" }>{ title }</Dialog.Title>
                        <Dialog.Description className={ "mb-4 mt-1" }>{ description }</Dialog.Description>

                        { children }

                        <div className={ "my-2" }>
                            <button onClick={ callbackAndClose } className={ "button" }>{ acceptButtonName }</button>
                            <button onClick={ () => setIsOpen(false) }
                                    className={ "button" }>{ cancelButtonName }</button>
                        </div>

                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};
