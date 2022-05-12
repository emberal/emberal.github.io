import * as React from "react";
import Layout from "../components/Layout";
import {Send, Linkedin} from "react-feather";
import {useForm} from "@formspree/react";
import {buttonStyle} from "../stylesheets/media.module.css";
import {formNameSubject} from "../stylesheets/text.module.css";

const inputStyle = {
    width: "100%",
    maxWidth: "100%",
    minHeight: "3vh",
    maxHeight: "50vh",
    borderRadius: "5px",
    resize: "vertical",
}
const socialsStyle = {
    display: "flex",
    justifyContent: "center",
}
/**
 * Contact-me element containing socials and a form linked to Formspree
 * @returns {JSX.Element}
 * @constructor
 */
const ContactMe = () => {

    const [state, handelSubmit] = useForm("mknykgbn");
    if (state.succeeded) {
        Array.from(document.querySelectorAll("input")).forEach( input => input.value = ""); //Clears inputs
        document.getElementById("contact-me-text-area").value = ""; //Clears textArea
    }
    React.useEffect(() => {
        const submitKeys = (e) => {
            if (e.ctrlKey) {
                //Activates button if ctrl and enter is clicked at the same time
                document.getElementById("submit-button").click();
            }
        }
        document.addEventListener("keyup", (e) => submitKeys(e));
        return () => {
            document.removeEventListener("keyup", (e) => submitKeys(e));
        }
    })

    return (
        <Layout
            title={"Kontakt meg"}
            children={
                <>
                    <div style={socialsStyle}>
                        <a style={{color: "inherit"}} title={"LinkedIn"}
                           href={"https://www.linkedin.com/in/martin-b-2a69391a3"} target={"_blank"} rel={"noreferrer"}>
                            <Linkedin/>
                        </a>
                    </div>
                    <form style={{marginRight: "10px"}} acceptCharset={"UTF-8"}
                          onSubmit={handelSubmit}>
                        <div className={formNameSubject}>
                            <label>
                                <p>Ditt navn</p>
                                <input style={inputStyle} name={"name"} type={"text"} placeholder={"Navn"}
                                       required/>
                            </label>
                            <label>
                                <p>Emne</p>
                                <input style={inputStyle} name={"Subject"} type={"text"} placeholder={"Emne"}
                                       required/>
                            </label>
                        </div>
                        <label>
                            <p>Din epostadresse</p>
                            <input style={inputStyle} name={"email"} type={"email"} placeholder={"Epostadresse"}
                                   required/>
                        </label>
                        <label>
                            <p>Melding</p>
                            <textarea id={"contact-me-text-area"} style={inputStyle} name={"message"}
                                      placeholder={"Melding"} required/>
                        </label>
                        <input name="_gotcha" type="text" style={{display: "none"}}/> {/*Honeypot spam filter*/}
                        <p></p>
                        <button id={"submit-button"} style={{float: "right", color: "inherit"}} className={buttonStyle}
                                title={"Send"}
                                type={"submit"} disabled={state.submitting}>
                            <Send/><p style={{display: "none"}}>Send</p>
                        </button>
                        {(state.succeeded) ? <p>Melding sent!</p> : null}
                    </form>
                </>
            }
        />
    );
}

export default ContactMe
