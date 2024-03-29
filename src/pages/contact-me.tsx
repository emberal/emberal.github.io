import * as React from "react";
import Layout from "../components/layout";
import { Send, Linkedin, GitHub } from "react-feather";
import { graphql, type HeadProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Input, { TextArea } from "../components/input";
import Seo from "../components/seo";
import { A } from "../components/link";
import { getElementById } from "../utils/dom";
import { For } from "../components/flow";

const inputStyle = "w-full max-w-full h-10 min-h-fit max-h-64 resize-y rounded-lg mb-3 pt-2 shadow";

const links = [
    {
        id: 0,
        to: "https://www.linkedin.com/in/martin-b-2a69391a3",
        name: "LinkedIn",
        icon: <Linkedin />
    },
    {
        id: 1,
        to: "https://github.com/h600878",
        name: "GitHub",
        icon: <GitHub />
    }
];

/**
 * Contact-me element containing socials and a form linked to Formspree
 * @returns {JSX.Element}
 * @constructor
 */
const ContactMePage: Component = () => {

    React.useEffect(() => {
        let isMounted = true;

        function submitKeys(e: KeyboardEvent): void {
            if (isMounted && e.ctrlKey && e.key === "Enter") {
                // Activates button if ctrl and enter is clicked at the same time
                const element = getElementById<HTMLButtonElement>("submit-button");
                element?.click();
            }
        }

        document.addEventListener("keyup", submitKeys);
        return () => {
            document.removeEventListener("keyup", submitKeys);
            isMounted = false;
        };
    });

    const { t } = useTranslation();

    return (
        <Layout
            title={ t("contactMe") ?? undefined }
            description={ t("contactMeDescription") /*TODO add translation*/ }>
            <>
                <div className={ "flex justify-center pb-2" }>
                    <For each={ links }>{ link =>
                        <div className={ "px-2" } key={ link.id }>
                            <A title={ link.name } to={ link.to } className={ "!text-inherit" }>
                                { link.icon }
                            </A>
                        </div>
                    }</For>
                </div>
                <form acceptCharset={ "UTF-8" }
                      id={ "form" }
                      target={ "_blank" }
                      action={ "https://formspree.io/f/mknykgbn" }
                      method={ "post" }>
                    <div className={ "flex justify-between flex-col sm:flex-row" }>
                        <FormInput title={ t("yourName") } name={ "name" } id={ "inputName" } type={ "text" } />
                        <FormInput title={ t("subject") } name={ "subject" } id={ "inputSubject" } type={ "text" } />
                    </div>
                    <FormInput title={ t("yourEmail") } name={ "_replyto" } id={ "inputEmail" } type={ "email" } />
                    <TextArea title={ t("message") }
                              required={ true }
                              name={ "message" }
                              id={ "contact-me-text-area" }
                              className={ `pl-2 min-h-[3rem] h-24 dark:bg-gray-900 focus:border-primaryPurple outline-none
                                  border-2 border-gray-500 ${ inputStyle }` } />
                    <input name="_gotcha" type="text" className={ "hidden" } /> { /*Honeypot spam filter*/ }
                    <button id={ "submit-button" } className={ "float-right" }
                            title={ "Send" }
                            name={ "submit" }
                            type={ "submit" }>
                        <Send />
                        <p className={ "hidden" }>Send</p>
                    </button>
                </form>
            </>
        </Layout>
    );
};

export default ContactMePage;

export const Head: Component<HeadProps<Queries.ContactMePageQuery>> = ({ data }) => {
    const locales = data?.locales?.edges[0]?.node?.data;
    let obj;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <Seo title={ obj?.contactMe } />; // TODO description
};

export const query = graphql`
    query ContactMePage($language: String!) {
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

const FormInput: Component<InputProps> = (
    {
        name,
        type,
        title,
        className,
        id
    }) => (
    <Input className={ `${ inputStyle } ${ className }` }
           name={ name }
           id={ id }
           type={ type }
           title={ title }
           required={ true } />
);
