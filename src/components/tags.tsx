import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import ScrollContainer from "react-indiana-drag-scroll";
import { ChevronLeft, ChevronRight } from "react-feather";
import { throttle } from "lodash";
import Row from "./row";
import { isTouch } from "../utils/touch";
import { For, Show } from "./flow";

interface TagProps extends ButtonProps {
    title?: string,
    value?: number,
}

/**
 * A tag containing a short string and a number of occurrences
 * @param name The string name that will be visible on the tag
 * @param value The number of occurrences of the tag
 * @param hoverTitle The string that will be shown when hovering above the tag
 * @param className Styling of the root element
 * @param onClick The function that will be called upon clicking the tag. If 'undefined' the cursor will appear normal
 * @param id A unique id for the tag
 * @constructor
 */
export const Tag: Component<TagProps> = (
    {
        title,
        value,
        hoverTitle,
        className,
        onClick,
        id
    }) => {

    const text = <span className={ "mx-2 w-max inline-block" }>{ title + (value ? `(${ value })` : "") }</span>;
    const classes = "border-rounded border-gray-500";

    if (onClick) {
        return (
            <button title={ hoverTitle ?? undefined } id={ id }
                    className={ `${ className } ${ classes }` }
                    onClick={ onClick }>
                { text }
            </button>
        );
    }
    return (
        <div title={ hoverTitle ?? undefined } id={ id }
             className={ `${ className } ${ classes }` }>
            { text }
        </div>
    );
};

interface TagsSelectorProps extends ComponentProps {
    allTag?: string,
    tagMap?: { key: string, value: number }[],
    selectedTag?: string,
    onClick?: Function,
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
export const TagsSelector: Component<TagsSelectorProps> = (
    {
        allTag = "All",
        selectedTag = "All",
        tagMap,
        onClick,
        id,
        className
    }) => {

    const { t } = useTranslation();

    /*
     * If 'true' most tags will be hidden, only one row will be visible.
     * It is possible to scroll through all the tags.
     */
    const [hideTags, setHideTags] = React.useState(true);
    // The text displayed on the button to hide or unhide tags
    const [hideTagsText, setHideTagsText] = React.useState(t("showMore"));
    // If the content in the container is wider than the container, this state is 'true'
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    // If the container is scrolled all the way to the left, this is 'true', otherwise 'false'
    const [isScrolled, setIsScrolled] = React.useState({ left: true, right: false });

    /**
     * Update the tags and tagsText states, to the opposite one
     */
    function toggleTags(): void {
        setHideTags(!hideTags);
        setHideTagsText(!hideTags ? t("showMore") : t("showLess"));
    }

    React.useEffect(() => {
        if (id) {
            setIsOverflowing(isOverflowingHorizontally(document.getElementById(id)));
        }

        /**
         * Checks if a HTMLElement overflows
         * @param element An HTMLElement where the final element is a show / hide button
         * @returns {boolean} Returns 'true' if the element overflows, false otherwise
         */
        function isOverflowingHorizontally(element: HTMLElement | null): boolean {
            if (element) {
                let sum = 0;
                const children = element.children[0].children;

                if (hideTags && isOverflowing) {
                    const box = document.getElementById("invisible-box");
                    if (box) {
                        sum -= box.clientWidth + 10; // Makes room for the hide button
                    }
                }
                for (let i = 1; i < children.length - 1; i++) {
                    if (children[i]) {
                        sum += children[i].clientWidth + 9; // The extra width is for the margin in between and borders
                    }

                    if (sum > element.clientWidth) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, [tagMap]);

    /**
     * The scrollable container the tags will be stored in
     */
    const scrollContainer = React.useRef<HTMLElement | null>(null);
    /**
     * The default scrollength when clicking on the arrows on the left and right side.
     * Default is half the size of the container, when loading the page.
     * If 'undefined' the value is 350px
     */
    const defScrollLen = (scrollContainer?.current?.clientWidth ?? 700) / 2;

    /**
     * Scrolls the scrollContainer to either side, positive numbers are to the right, negative to the left
     * @param scrollLeft The amount of pixels the container should scroll, positive is to the right, negative is to the left
     */
    function scroll(scrollLeft: number): void {
        if (scrollContainer.current) {
            scrollContainer.current.scrollLeft += scrollLeft;
            onScroll();
        }
    }

    /**
     * Checks the position of the scrollContainer and updates the states
     */
    function onScroll(): void {
        checkScrollLeft();
        checkScrollRight();
    }

    /**
     * Checks if the scrollContainer is all the way to the left and updates the states
     */
    function checkScrollLeft(): void {
        if (scrollContainer.current) {
            const left = isLeft();
            if (isScrolled.left !== left) {
                setIsScrolled({ left: left, right: isScrolled.right });
            }
            else if (!isRight()) {
                setIsScrolled({ left: isScrolled.left, right: false });
            }
        }
    }

    /**
     * Checks if the scrollContainer is all the way to the right and updates the states
     */
    function checkScrollRight(): void {
        if (scrollContainer.current) {
            const right = isRight();
            if (isScrolled.right !== right) {
                setIsScrolled({ left: isScrolled.left, right });
            }
            else if (!isLeft()) {
                setIsScrolled({ left: false, right: isScrolled.right });
            }
        }
    }

    /**
     * Checks if the scrollContatiner is all the way to the left
     * @returns 'true' if all the way to the left, otherwise 'false'
     */
    function isLeft(): boolean {
        return scrollContainer.current !== null && scrollContainer.current.scrollLeft <= 3;
    }

    /**
     * Checks if the scrollContatiner is all the way to the right
     * @returns 'true' if all the way to the right, otherwise 'false'
     */
    function isRight(): boolean {
        return scrollContainer.current !== null && scrollContainer.current.scrollLeft >= scrollContainer.current.scrollWidth - 660;
    }

    React.useEffect(() => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollTo(0, 0); // Default scroll location
        }
    }, []);

    React.useEffect(() => {
        if (hideTags || !isOverflowing) {
            setIsScrolled({ left: true, right: isScrolled.right });
            setIsScrolled({ left: isScrolled.left, right: false });
        }
    }, [hideTags, isOverflowing]);

    const chevronClasses = `default-text animate-pulse bg-white-transparent-1/2 dark:bg-black-transparent-1/2 border-rounded
     border-transparent overflow-auto cursor-pointer`;

    return (
        <div id={ id }>
            <ScrollContainer
                innerRef={ scrollContainer }
                vertical={ false }
                onScroll={ throttle(onScroll, 100) }
                hideScrollbars={ false }
                className={ `flex gap-1 mb-2 ${ hideTags ? `overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] hide-scrollbar
                 cursor-grab` : "flex-wrap" } ${ className }` }>
                <>
                    <Tag title={ allTag }
                         onClick={ () => onClick?.call(this, allTag) }
                         className={ `hover:border-primaryPurple ${ selectedTag === allTag && "!border-primaryPurple" }` } />
                    <For each={ tagMap }>{ tag =>
                        <Tag title={ tag.key } key={ tag.key }
                             value={ tag.value }
                             onClick={ () => onClick?.call(this, tag.key) }
                             className={ `hover:border-primaryPurple w-max
                                     ${ selectedTag === tag.key && "!border-primaryPurple" }` } />
                    }</For>
                    <Show when={ isOverflowing }>
                        <>
                            <div id={ "invisible-box" }
                                 className={ `text-transparent min-w-max mx-2 ${ !hideTags && "hidden" }` }>
                                { hideTags && t("showMore") }
                            </div>
                            <Row className={ `${ hideTags && "absolute right-0 gap-3" }` }>

                                <Show when={ hideTags && !isTouch() && !isScrolled.right }>
                                    <button title={ t("clickToScroll") ?? undefined }>
                                        <ChevronRight className={ chevronClasses }
                                                      onClick={ () => scroll(defScrollLen) } />
                                    </button>
                                </Show>

                                <Tag title={ hideTagsText?.toString() } onClick={ toggleTags }
                                     hoverTitle={ hideTags ? t("showMoreTags") : t("showLessTags") }
                                     className={ `hover:border-primaryPurple min-w-max ${ hideTags &&
                                     "default-bg" } shadow-sm shadow-primaryPurple` } />
                            </Row>
                            <Show when={ hideTags && !isTouch() && !isScrolled.left }>
                                <button className={ "absolute left-0" } title={ t("clickToScroll") ?? undefined }>
                                    <ChevronLeft className={ chevronClasses + " mt-[1px]" }
                                                 onClick={ () => scroll(-defScrollLen) } />
                                </button>
                            </Show>
                        </>
                    </Show>
                </>
            </ScrollContainer>
        </div>
    );
};

interface TagsRowProps extends ComponentProps {
    tags: string[],
    sort?: boolean,
}

/**
 * A row containing an array of tags
 * @param tags A string set containing all the names of the tags
 * @param sort If 'true' will sort the string[] in ascending order
 * @param className Styling of the root element
 * @param id A unique id for the component
 */
export const TagsRow: Component<TagsRowProps> = (
    {
        tags,
        sort = true,
        className,
        id
    }) => {

    if (sort) {
        tags.sort();
    }

    return (
        <Row className={ `flex-wrap gap-1 ${ className }` } id={ id }>
            <For each={ tags }>{ tag =>
                <div key={ tag }>
                    <Tag title={ tag } />
                </div>
            }</For>
        </Row>
    );
};
