import * as React from "react";
import Tag from "./tag";
import { useTranslation } from "gatsby-plugin-react-i18next";

interface TagsSelector {
    allTag?: string,
    tagMap?: any[],
    selectedTag?: string,
    updateTagState?: Function,
    id?: string,
    className?: string,
}

const TagsSelector = ({ allTag, selectedTag, tagMap, updateTagState, id, className }: TagsSelector) => {

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
                const children = element.children;

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

    return (
        <div id={ id } className={ `flex gap-1 ${ hideTags ? `overflow-scroll pb-3 ${ isOverflowing ? "" : "" }`
            : "flex-wrap mb-2" } ${ className }` }>
            <>
                {
                    allTag !== undefined ?
                        <Tag
                            name={ allTag }
                            onClick={ updateTagState !== undefined ? () => updateTagState(allTag) : undefined }
                            className={ `hover:border-primaryPurple ${ selectedTag === allTag ? "!border-primaryPurple" : "" }` }/>
                        : null
                }
                {
                    tagMap?.map((tag: any) =>
                        <div key={ tag.key }>
                            <Tag name={ tag.key }
                                 value={ tag.value }
                                 onClick={ updateTagState !== undefined ? () => updateTagState(tag.key) : undefined }
                                 className={ `hover:border-primaryPurple w-max
                                     ${ selectedTag === tag.key ? "!border-primaryPurple" : "" }` }/>
                        </div>)
                }
                { /*TODO scroll on PC by dragging the mouse*/ }
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
        </div>
    )
};

export default TagsSelector;
