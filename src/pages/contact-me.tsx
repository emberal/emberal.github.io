import * as React from "react";
import Layout, { Links } from "../components/layout";
import { Send, Linkedin, GitHub } from "react-feather";
import { useForm } from "@formspree/react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

const inputStyle = "w-full max-w-full h-10 min-h-fit max-h-64 resize-y border rounded-lg mb-2 dark:bg-gray-800 pl-2 " +
    "focus:border-primaryPurple outline-none shadow";

const links = [
    {
        id: 0,
        to: "https://www.linkedin.com/in/martin-b-2a69391a3",
        name: "LinkedIn",
        icon: <Linkedin/>
    },
    {
        id: 1,
        to: "https://github.com/h600878",
        name: "GitHub",
        icon: <GitHub/>
    }
];

/**
 * Contact-me element containing socials and a form linked to Formspree
 * @returns {JSX.Element}
 * @constructor
 */
const ContactMe = () => {

    const [state, handelSubmit] = useForm("mknykgbn");
    if (state.succeeded) {
        Array.from(document.querySelectorAll("input")).forEach(input => input.value = ""); //Clears inputs
        const element = document.getElementById("contact-me-text-area") as HTMLInputElement; //Clears textArea
        if (element !== null) {
            element.value = "";
        }
    }
    React.useEffect(() => {
        const submitKeys = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                //Activates button if ctrl and enter is clicked at the same time
                const element = document.getElementById("submit-button");
                if (element !== null) {
                    element.click();
                }
            }
        }
        document.addEventListener("keyup", (e) => submitKeys(e));
        return () => {
            document.removeEventListener("keyup", (e) => submitKeys(e));
        };
    });

    const { t } = useTranslation();

    return (
        <Layout
            title={ t("contactMe") }
            description={ t("contactMeDescription") /*TODO add translation*/ }
            current={ Links.contactMe }>
            <>
                <div className={ "flex justify-center" }>
                    {
                        links.map(link => (
                            <div className={ "px-2" } key={ link.id }>
                                <a title={ link.name } href={ link.to } target={ "_blank" } rel={ "noreferrer" }>
                                    { link.icon }
                                </a>
                            </div>
                        ))
                    }
                </div>
                <form acceptCharset={ "UTF-8" } onSubmit={ handelSubmit }>
                    <div className={ "flex justify-between flex-col sm:flex-row" }>
                        <label>
                            <p>{ t("yourName") }</p>
                            <input className={ inputStyle } name={ "name" } type={ "text" }
                                   placeholder={ "Ola Nordmann" }
                                   required/>
                        </label>
                        <label>
                            <p>{ t("subject") }</p>
                            <input className={ inputStyle } name={ "Subject" } type={ "text" }
                                   placeholder={ "Heisann!" }
                                   required/>
                        </label>
                    </div>
                    <label>
                        <p>{ t("yourEmail") }</p>
                        <input className={ inputStyle } name={ "email" } type={ "email" }
                               placeholder={ "ola@nordmann.no" }
                               required/>
                    </label>
                    <label>
                        <p>{ t("message") }</p>
                        <textarea id={ "contact-me-text-area" }
                                  className={ `min-h-[3rem] ${ inputStyle }` }
                                  name={ "message" }
                                  placeholder={ t("message") } required/>
                    </label>
                    <input name="_gotcha" type="text" className={ "hidden" }/> {/*Honeypot spam filter*/ }
                    <p></p>
                    <button id={ "submit-button" } className={ "float-right" }
                            title={ "Send" }
                            type={ "submit" } disabled={ state.submitting }>
                        <Send/><p className={ "hidden" }>Send</p>
                    </button>
                    { (state.succeeded) ? <p>{ t("messageSent") }</p> : null }
                </form>
            </>
        </Layout>
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

export default ContactMe;
