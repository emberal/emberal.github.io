import * as React from "react";
import Tag from "./tag";
import { useTranslation } from "gatsby-plugin-react-i18next";
import ScrollContainer from "react-indiana-drag-scroll";

interface TagsSelector {
    allTag?: string,
    tagMap?: any[],
    selectedTag?: string,
    onClick?: Function,
    id?: string,
    className?: string,
}

/**
 * This component is meant to contain a list of Tags, that can be used to sort a page.
 * Each tag is selectable and with an 'all' button that will display all, which is enabled by default.
 * The tags can be hidden down to just one line, with horizontal scrolling, or all can be displayed at the same time, flex-wrapped
 * @param allTag The name of the tag that will display all tags, and it's content
 * @param selectedTag The currently selected tag
 * @param tagMap An array containing objects with a unique string key, and a number value. Value is meant to display the number
 * of occurrences of the key. If value is 'undefined' the parenthesis will not be shown.
 * @param onClick The function to be called when a tag is clicked or tapped
 * @param id A unique id of the component
 * @param className Styling of the root element
 * @constructor
 */
const TagsSelector = ({ allTag = "All", selectedTag, tagMap, onClick, id, className }: TagsSelector) => {

    const { t } = useTranslation();

    const [hideTags, setHideTags] = React.useState(true);

    const [hideTagsText, setHideTagsText] = React.useState(t("showMore"));

    /**
     * Update the tags and tagsText states, to the opposite one
     */
    function toggleTags() {
        setHideTags(!hideTags);
        setHideTagsText(!hideTags ? t("showMore") : t("showLess"));
    }

    const [isOverflowing, setIsOverflowing] = React.useState(false);
    React.useEffect(() => {
        setIsOverflowing(isOverflowingHorizontally(document.getElementById(id ?? "")));

        /**
         * Checks if a HTMLElement overflows
         * @param element An HTMLElement where the final element is a show / hide button
         * @returns {boolean} Returns 'true' if the element overflows, false otherwise
         */
        function isOverflowingHorizontally(element: HTMLElement | null): boolean {
            if (element !== null) {
                let sum = 0;
                const children = element.children[0].children;

                if (hideTags) {
                    sum -= 90; // Makes room for the hide button
                }
                for (let i = 0; i < children.length - 1; i++) {
                    if (children[i] !== null) {
                        sum += children[i].clientWidth + 4; // +4 is almost equal to 0.25 rem gap between
                    }

                    if (sum > element.clientWidth) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, [selectedTag]);

    const scrollContainer = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollTo(0, 0);
        }
    }, []);

    return (
        <div id={ id }>
            <ScrollContainer // TODO add visual, to show it's possible to drag
                innerRef={ scrollContainer }
                vertical={ false }
                className={ `flex gap-1 mb-2 ${ hideTags ? `overflow-scroll` : "flex-wrap" } ${ className }` }>
                <>
                    {
                        allTag !== undefined ?
                            <Tag
                                name={ allTag }
                                onClick={ onClick !== undefined ? () => onClick(allTag) : undefined }
                                className={ `hover:border-primaryPurple ${ selectedTag === allTag ? "!border-primaryPurple" : "" }` }/>
                            : null
                    }
                    {
                        tagMap?.map((tag: any) =>
                            <div key={ tag.key }>
                                <Tag name={ tag.key }
                                     value={ tag.value }
                                     onClick={ onClick !== undefined ? () => onClick(tag.key) : undefined }
                                     className={ `hover:border-primaryPurple w-max
                                     ${ selectedTag === tag.key ? "!border-primaryPurple" : "" }` }/>
                            </div>)
                    }
                    {
                        isOverflowing ?
                            <>
                                <div className={ `text-transparent min-w-max mx-2 ${ !hideTags ? "hidden" : "" }` }>
                                    { hideTags ? t("showMore") : null }
                                </div>
                                <Tag name={ hideTagsText.toString() } onClick={ toggleTags }
                                     hoverTitle={ hideTags ? t("showMoreTags") : t("showLessTags") }
                                     className={ `hover:border-primaryPurple min-w-max ${ hideTags ?
                                         "absolute bg-white dark:bg-gray-900 right-0" : "" } shadow-sm shadow-primaryPurple` }/>
                            </>
                            : null
                    }
                </>
            </ScrollContainer>
        </div>
    )
};

export default TagsSelector;
