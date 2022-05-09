import * as React from "react";
import Layout from "../components/Layout";
import FeatherIcon from "feather-icons-react";
import {buttonStyle, iconStyle} from "../stylesheets/media.module.css";
import {formNameSubject} from "../stylesheets/text.module.css";

const inputStyle = {
    width: "100%",
    maxWidth: "100%",
    minHeight: "3vh",
    maxHeight: "50vh",
    borderRadius: "5px",
    resize: "vertical",
}

const ContactMe = () => {

    const handleChange = () => {
        console.log("Changed"); //TODO
    }
    const handleSubmit = () => {
        console.log("Submitted"); //TODO
    }

    return (
        <Layout
            title={"Kontakt meg"}
            headline={"Kontakt meg"}
            children={
                <>
                    <form acceptCharset={"UTF-8"} method={"post"} action={"https://formspree.io/f/mknykgbn"}
                          onSubmit={handleSubmit}>
                        <div className={formNameSubject}>
                            <label>
                                <p>Navn</p>
                                <input style={inputStyle} name={"name"} type={"text"} placeholder={"Navn"} onChange={handleChange} required/>
                            </label>
                            <label>
                                <p>Emne</p>
                                <input style={inputStyle} name={"Subject"} type={"text"} placeholder={"Emne"} onChange={handleChange}
                                       required/>
                            </label>
                        </div>
                        <label>
                            <p>Din epostadresse</p>
                            <input style={inputStyle} name={"_replyto"} type={"email"} placeholder={"Epostadresse"} onChange={handleChange}
                                   required/>
                        </label>
                        <label>
                            <p>Melding</p>
                            <textarea style={inputStyle} name={"message"} placeholder={"Melding"} onChange={handleChange}
                                   required/>
                        </label>
                        <input name="_gotcha" type="text" style={{display: "none"}}/> {/*Honeypot spam filter*/}
                        <p></p>
                        <button style={{float: "right"}} className={buttonStyle} title={"Send"} type={"submit"}>
                            <FeatherIcon className={iconStyle} icon={"send"}/><p style={{display: "none"}}>Send</p>
                        </button>
                    </form>
                </>
            }
        />
    )
}

export default ContactMe
