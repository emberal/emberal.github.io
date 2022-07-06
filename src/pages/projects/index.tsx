import * as React from "react";
import Layout, { Links } from "../../components/layout";
import { graphql, Link, PageProps } from "gatsby";
import { GitHub } from "react-feather";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Tag from "../../components/tag";

/**
 * Takes a String in a csv format, separated by ";" and returns an array of strings
 * @param csv A String representation of a csv file, with ; as separator
 * @returns {string[]} An array of strings, in the order the strings in the 'csv' string was
 */
export const splitCSV = (csv: string) => csv.split(";");

/**
 * Contains cards of all projects with some information, and links to the posts
 * @param data A query containing data from the posts
 * @returns {JSX.Element} A page
 * @constructor
 */
const ProjectPage = ({ data: { allMdx } }: PageProps<Queries.ProjectPageQuery>): JSX.Element => {

    const { t } = useTranslation();
    let image: IGatsbyImageData | undefined;

    const allProjectTags = allMdx.nodes.map(node => node.frontmatter?.tags);
    const [tags, setTags] = React.useState(allProjectTags);

    // TODO? the option to select multiple tags to improve search, use string[] in useState
    const tagMap: any[] = [];
    let objectIndex = 0;
    for (const tag of tags) {
        const tagArray = splitCSV(tag ?? "");

        if (tagArray !== undefined) {
            for (const tagInArray of tagArray) {

                let found = false;
                for (const tagInMap of tagMap) {
                    if (tagInArray.toLowerCase() === tagInMap.key.toLowerCase()) {
                        tagInMap.value += 1;
                        found = true;
                    }
                }
                if (!found) {
                    tagMap[objectIndex] = {
                        key: tagInArray,
                        value: 1,
                    };
                    objectIndex++;
                }
            }
        }
    }
    tagMap.sort((a: any, b: any) => b.value - a.value);
    const [selectedTag, setSelectedTag] = React.useState("");

    const [hideTags, setHideTags] = React.useState(true);

    const [hideTagsText, setHideTagsText] = React.useState(t("showMore"));

    /**
     * Updates the state of the current selected tag to a new one. If the new one is the same as the old, reset.
     * @param key The key for the new tag
     */
    function updateTagState(key: string) {
        if (selectedTag === key) {
            setSelectedTag("");
            setTags(allProjectTags);
        }
        else {
            setSelectedTag(key);
            let tags = allMdx.nodes.map(node => contains(node.frontmatter?.tags, key) ? node.frontmatter?.tags : null);
            tags = tags.filter((element: string | null | undefined) => element !== null); // Removes the null values
            setTags(tags);
        }
    }

    /**
     * Checks if a csv string contains a spesific value
     * @param csv A csv string, separated by ';'
     * @param key The key that will be compared to ehe csv string
     */
    function contains(csv: string | null | undefined, key: string): boolean {
        return splitCSV(csv?.toLowerCase() ?? "").some(element => element === key.toLowerCase());
    }

    /**
     * Update the tags and tagsText states, to the opposite one
     */
    function toggleTags() {
        setHideTags(!hideTags);
        setHideTagsText(!hideTags ? t("showMore") : t("showLess"));
    }

    return (
        <Layout
            title={ t("projects") }
            headline={ t("myProjects") }
            description={ t("projectsByMe") }
            current={ Links.projects }>
            <div>
                <div className={ `flex ${ hideTags ? "overflow-scroll pb-3 mr-[6.65rem]" : "flex-wrap mb-2" } gap-1` }>
                    {
                        tagMap.map((tag: any) =>
                            <div key={ tag.key }>
                                <Tag name={ tag.key }
                                     value={ tag.value }
                                     onClick={ () => updateTagState(tag.key) }
                                     className={ `hover:border-primaryPurple w-max
                                     ${ selectedTag === tag.key ? "!border-primaryPurple" : "" }` }/>
                            </div>)
                    }
                    {/*TODO scroll on PC by dragging the mouse*/ /*TODO hide button if there aren't more tags to show!*/ }
                    <Tag name={ hideTagsText.toString() } onClick={ toggleTags }
                         hoverTitle={ hideTags ? t("showMoreTags") : t("showLessTags") }
                         className={ `hover:border-primaryPurple min-w-max 
                         ${ hideTags ? "absolute bg-white dark:bg-gray-900 right-0" : "" } shadow-sm shadow-primaryPurple` }/>
                </div>
                {
                    allMdx.nodes.map((node: any) => (
                        <div key={ node.id }>
                            {
                                selectedTag === "" || contains(node.frontmatter?.tags, selectedTag) ?

                                    <article className={ "border-2 border-gray-500 rounded-xl mb-10 shadow" }>
                                        <div className={ "mx-2 mb-2" }>
                                            <div className={ "flex items-center my-3" }>
                                                <Link
                                                    className={ "text-primaryPurple dark:text-primaryPink hover:underline mr-2" }
                                                    to={ node.slug }>
                                                    <h2 className={ "text-xl" }>{ node.frontmatter?.title }</h2>
                                                </Link>
                                                <a title={ t("openInGitHub") } href={ node.frontmatter?.source }
                                                   target={ "_blank" } rel={ "noreferrer" }><GitHub/>
                                                </a>
                                            </div>
                                            <div className={ "grid grid-flow-col justify-between mb-2" }>
                                                <p>
                                                    { t("timeToRead") } { node.timeToRead } { (node.timeToRead === 1) ?
                                                    t("minute") : t("minutes") }
                                                </p>
                                            </div>
                                            <div className={ "flex flex-row flex-wrap gap-1" }>
                                                {
                                                    splitCSV(node.frontmatter?.tags).map(tag =>
                                                        <div key={ tag }>
                                                            <Tag name={ tag }/>
                                                        </div>)
                                                }
                                            </div>
                                        </div>

                                        { (() => { // Used to initiate the variable image in order to null check it
                                            image = getImage(node.frontmatter?.hero_image.childImageSharp.gatsbyImageData)
                                            return true;
                                        })() }
                                        { image ?
                                            <GatsbyImage alt={ node.frontmatter?.hero_image_alt }
                                                         image={ image }/> : null }
                                        <div className={ "mx-2 my-4" }>
                                            <p>{ node.frontmatter?.description }</p>
                                        </div>
                                    </article>
                                    : null
                            }
                        </div>
                    ))
                }
            </div>
        </Layout>
    );
}

export const query = graphql`
    query ProjectPage ($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        allMdx(sort: {fields: frontmatter___uploaded, order: DESC}) {
            nodes {
                frontmatter {
                    title
                    description
                    tags
                    source
                    hero_image_alt
                    hero_image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    uploaded
                }
                id
                slug
                timeToRead
            }
        }
    }
`;

export default ProjectPage;
