import * as React from "react";
import Layout, { Links } from "../components/layout";
import { Send, Linkedin, GitHub } from "react-feather";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Input from "../components/input";

const inputStyle = "w-full max-w-full h-10 min-h-fit max-h-64 resize-y rounded-lg mb-2 shadow";

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

    React.useEffect(() => {
        let isMounted = true;
        const submitKeys = (e: KeyboardEvent) => {
            if (isMounted && e.ctrlKey) {
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
            isMounted = false;
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
                <form acceptCharset={ "UTF-8" }
                      action={ "https://formspree.io/f/mknykgbn" }
                      method={ "post" }>
                    <div className={ "flex justify-between flex-col sm:flex-row" }>
                        <label>
                            <p>{ t("yourName") }</p>
                            <Input className={ inputStyle }
                                   name={ "name" }
                                   type={ "text" }
                                   placeholder={ "Ola Nordmann" }
                                   required={ true }/>
                        </label>
                        <label>
                            <p>{ t("subject") }</p>
                            <Input className={ inputStyle }
                                   name={ "subject" }
                                   type={ "text" }
                                   placeholder={ "Heisann!" }
                                   required={ true }/>
                        </label>
                    </div>
                    <label>
                        <p>{ t("yourEmail") }</p>
                        <Input className={ inputStyle }
                               name={ "_replyto" }
                               type={ "email" }
                               placeholder={ "ola@nordmann.no" }
                               required={ true }/>
                    </label>
                    <label>
                        <p>{ t("message") }</p>
                        <textarea id={ "contact-me-text-area" }
                                  className={ `pl-2 min-h-[3rem] dark:bg-gray-900 focus:border-primaryPurple outline-none
                                   border-2 border-gray-500 ${ inputStyle }` }
                                  name={ "message" }
                                  placeholder={ t("message") }
                                  required/>
                    </label>
                    <input name="_gotcha" type="text" className={ "hidden" }/> { /*Honeypot spam filter*/ }
                    <p></p>
                    <button id={ "submit-button" } className={ "float-right" }
                            title={ "Send" }
                            type={ "submit" }>
                        <Send/><p className={ "hidden" }>Send</p>
                    </button>
                    { (false) ? <p>{ t("messageSent") }</p> : null }
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
