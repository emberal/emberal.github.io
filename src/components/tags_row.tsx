import * as React from "react";
import Tag from "./tag";
import { splitCSV } from "../pages/projects";

interface TagsRow {
    tags?: string[],
    sort?: boolean,
    className?: string,
    id?: string,
}

/**
 * A row containing an array of tags
 * @param tags A string array containing all the names of the tags
 * @param sort If 'true' will sort the string[] in ascending order
 * @param className Styling of the root element
 * @param id A unique id for the component
 * @constructor
 */
const TagsRow = ({ tags, sort = true, className, id }: TagsRow) => {
    if (tags !== undefined) {
        if (sort) {
            tags.sort();
        }

        return (
            <div className={ `flex flex-row flex-wrap gap-1 ${ className }` } id={ id }>
                {
                    tags.map(tag =>
                        <div key={ tag }>
                            <Tag name={ tag }/>
                        </div>
                    )
                }
            </div>
        );
    }
    else {
        return null;
    }

}

export default TagsRow;
