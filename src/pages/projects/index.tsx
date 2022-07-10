import * as React from "react";
import Layout, { Links } from "../../components/layout";
import { graphql, Link, PageProps } from "gatsby";
import { GitHub } from "react-feather";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { TagsRow, TagsSelector } from "../../components/tags";
import Search from "../../components/search";
import { ChangeEvent } from "react";
import ProjectCard from "../../components/project";

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
const ProjectPage = ({ data: { allMdx } }: PageProps<Queries.ProjectPageQuery>): JSX.Element => { // TODO search

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
    tagMap.sort((a: any, b: any) => {
        let sum: number;
        if (b.value !== a.value) {
            sum = b.value - a.value;
        }
        else {
            if (a.key > b.key) {
                sum = 1;
            }
            else {
                sum = -1;
            }
        }
        return sum;
    });

    const allTag = t("all");

    const [selectedTag, setSelectedTag] = React.useState(allTag);

    /**
     * Updates the state of the current selected tag to a new one. If the new one is the same as the old, reset.
     * @param key The key for the new tag
     */
    function updateTagState(key: string) {
        if (selectedTag === key || key === allTag) { // Resets tags
            setSelectedTag(allTag);
            setTags(allProjectTags);
        }
        else { // Updates the tags to all the projects that contain the key
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
     * @returns {boolean} 'true' if atleast one element in the csv string equals the given key
     */
    function contains(csv: string | null | undefined, key: string): boolean {
        return splitCSV(csv?.toLowerCase() ?? "").some(element => element === key.toLowerCase());
    }

    const [searchState, setSearchState] = React.useState("");

    function onSearch(event?: ChangeEvent<HTMLInputElement>) {
        setSearchState((document.getElementById("search") as HTMLInputElement).value.toLowerCase());
    }

    let numberOfPosts = 0;

    function resetNumberOfPosts() {
        numberOfPosts = 0;
    }

    function containsSearchString(title: string, tags: string) {
        const search = title.toLowerCase().includes(searchState) || tags.toLowerCase().includes(searchState);
        const result = search && (selectedTag === allTag || contains(tags, selectedTag));
        if (result) {
            numberOfPosts++;
        }
        return result;
    }

    return (
        <Layout
            title={ t("projects") }
            headline={ t("myProjects") }
            description={ t("projectsByMe") }
            current={ Links.projects }>
            <div>
                { // TODO improve for mobile!
                    !("ontouchstart" in document.documentElement) ? <Search onChange={ onSearch } collapse={ false }/> : null
                }

                <TagsSelector id={ "tags" } allTag={ allTag } tagMap={ tagMap } selectedTag={ selectedTag }
                              onClick={ updateTagState }/>
                {
                    allMdx.nodes.map((node: any, index: number) => (
                        <div key={ node.id }>
                            <>
                                {
                                    containsSearchString(node.frontmatter.title, node.frontmatter.tags) ?

                                        <ProjectCard
                                            title={ node.frontmatter.title }
                                            slug={ node.slug }
                                            description={ node.frontmatter.description }
                                            tags={ node.frontmatter.tags }
                                            timeToRead={ node.timeToRead }
                                            source={ node.frontmatter.source }
                                            image={ node.frontmatter.hero_image.childImageSharp.gatsbyImageData }
                                            imageAlt={ node.frontmatter.hero_image_alt }/>
                                        :
                                        numberOfPosts === 0 && index === allMdx.nodes.length - 1 ?
                                            <div className={ "absolute w-full mt-14" }>
                                                <>
                                                    <span className={ "flex justify-center" }>{ t("noResults") }</span>
                                                    { resetNumberOfPosts() }
                                                </>
                                            </div>
                                            : null
                                }
                            </>
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
