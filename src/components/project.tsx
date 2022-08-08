import * as React from "react";
import { Link } from "gatsby";
import { GitHub } from "react-feather";
import { TagsRow } from "./tags";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { splitCSV } from "../pages/projects";
import { useTranslation } from "gatsby-plugin-react-i18next";

interface ProjectCard {
    title?: string,
    description?: string,
    slug?: string,
    source?: string,
    timeToRead?: number,
    tags?: string,
    image?: ImageDataLike,
    imageAlt?: string,
    className?: string,
    key?: string,
    id?: string,
}

const ProjectCard = (
    {
        title = "",
        description = "",
        slug = "/",
        source,
        timeToRead = 1,
        tags,
        image,
        imageAlt = "",
        className,
        key,
        id,
    }: ProjectCard) => {

    const { t } = useTranslation();

    image = image ? getImage(image) : undefined;

    return (
        <div key={ key } id={ id } className={ `${ className }` }>
            {
                <article className={ "border-2 border-gray-500 rounded-xl mb-10 shadow" }>
                    <div className={ "mx-2 mb-2" }>
                        <div className={ "flex items-center my-3" }>
                            <Link
                                className={ "text-standard hover:underline mr-2" }
                                to={ slug }>
                                <h2 className={ "text-xl" }>{ title }</h2>
                            </Link>
                            <a title={ t("openInGitHub") } href={ source }
                               target={ "_blank" } rel={ "noreferrer" }><GitHub/>
                            </a>
                        </div>
                        <div className={ "grid grid-flow-col justify-between mb-2" }>
                            <p>
                                { t("timeToRead") } { timeToRead } { (timeToRead === 1) ? t("minute") : t("minutes") }
                            </p>
                        </div>
                        <TagsRow tags={ splitCSV(tags ?? "") }/>
                    </div>
                    <div className={ `max-h-[40rem] flex justify-center` }>
                        {
                            image ? <GatsbyImage className={ `${ image.height > image.width * 2 && "w-72" }` } alt={ imageAlt }
                                                 image={ image }/> : null
                        }
                    </div>
                    <div className={ "mx-2 my-4" }>
                        <p>{ description }</p>
                    </div>
                </article>
            }
        </div>
    );
}

export default ProjectCard;
