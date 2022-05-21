import * as React from "react";
import Layout from "../components/Layout";
import {Send, Linkedin, GitHub} from "react-feather";
import {useForm} from "@formspree/react";
import {graphql} from "gatsby";
import {buttonStyle} from "../stylesheets/media.module.css";
import {formNameSubject} from "../stylesheets/text.module.css";
import {useTranslation} from "gatsby-plugin-react-i18next";

const inputStyle = {
    width: "100%",
    maxWidth: "100%",
    minHeight: "30px",
    maxHeight: "50vh",
    borderRadius: "5px",
    resize: "vertical",
}
const socialsStyle = {
    display: "flex",
    justifyContent: "center",
}
const iconStyles = {
    color: "inherit",
    marginLeft: "5px",
    marginRight: "5px",
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
        };
    });

    const {t} = useTranslation();

    return (
        <Layout
            title={t("contactMe")}
            children={
                <>
                    <div style={socialsStyle}>
                        <a style={iconStyles} title={"LinkedIn"}
                           href={"https://www.linkedin.com/in/martin-b-2a69391a3"} target={"_blank"} rel={"noreferrer"}>
                            <Linkedin/>
                        </a>
                        <a style={iconStyles} title={"GitHub"}
                            href={"https://github.com/h600878"} target={"_blank"} rel={"noreferrer"}>
                            <GitHub/>
                        </a>
                    </div>
                    <form style={{marginRight: "10px"}} acceptCharset={"UTF-8"}
                          onSubmit={handelSubmit}>
                        <div className={formNameSubject}>
                            <label>
                                <p>{t("yourName")}</p>
                                <input style={inputStyle} name={"name"} type={"text"} placeholder={"Ola Nordmann"}
                                       required/>
                            </label>
                            <label>
                                <p>{t("subject")}</p>
                                <input style={inputStyle} name={"Subject"} type={"text"} placeholder={"Heisann!"}
                                       required/>
                            </label>
                        </div>
                        <label>
                            <p>{t("yourEmail")}</p>
                            <input style={inputStyle} name={"email"} type={"email"} placeholder={"ola@nordmann.no"}
                                   required/>
                        </label>
                        <label>
                            <p>{t("message")}</p>
                            <textarea id={"contact-me-text-area"} style={inputStyle} name={"message"}
                                      placeholder={t("message")} required/>
                        </label>
                        <input name="_gotcha" type="text" style={{display: "none"}}/> {/*Honeypot spam filter*/}
                        <p></p>
                        <button id={"submit-button"} style={{float: "right", color: "inherit"}} className={buttonStyle}
                                title={"Send"}
                                type={"submit"} disabled={state.submitting}>
                            <Send/><p style={{display: "none"}}>Send</p>
                        </button>
                        {(state.succeeded) ? <p>{t("messageSent")}</p> : null}
                    </form>
                </>
            }
        />
    );
}

export const query = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;

export default ContactMe
