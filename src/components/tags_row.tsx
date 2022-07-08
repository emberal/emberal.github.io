import * as React from "react";
import Tag from "./tag";
import { splitCSV } from "../pages/projects";

interface TagsRow {
    tagsCSV?: string,
    sort?: boolean,
    className?: string,
    id?: string,
}

const TagsRow = ({ tagsCSV, sort = true, className, id }: TagsRow) => {
    if (tagsCSV !== undefined) {
        const array = splitCSV(tagsCSV);
        if (sort) {
            array.sort();
        }

        return (
            <div className={ `flex flex-row flex-wrap gap-1 ${ className }` } id={ id }>
                {
                    array.map(tag =>
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
