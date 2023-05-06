import * as React from "react";
import { Link } from "gatsby";
import { GitHub } from "react-feather";
import { TagsRow } from "./tags";
import { GatsbyImage, getImage, type ImageDataLike } from "gatsby-plugin-image";
import { splitCSV } from "../utils/util";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { A } from "./link";

interface ProjectCardProps extends TitleProps {
    description?: string,
    slug?: string,
    source?: string,
    timeToRead?: number,
    tags?: string | null,
    image?: ImageDataLike,
    imageAlt?: string,
}

const ProjectCard: Component<ProjectCardProps> = (
    {
        title = "Project",
        description = "",
        slug = "/",
        source = "https://github.com/h600878",
        timeToRead = 1,
        tags,
        image,
        imageAlt = "",
        className,
        id,
    }) => {

    const { t } = useTranslation();

    image = image ? getImage(image) : undefined;

    return (
        <div id={ id } className={ `${ className }` }>

            <article className={ "border-rounded border-gray-500 mb-10 shadow" }>

                <div className={ "mx-2 mb-2" }>

                    <div className={ "flex-row-center my-3" }>
                        <Link
                            className={ "default-link mr-2" }
                            to={ slug }>
                            <h2 className={ "text-xl" }>{ title }</h2>
                        </Link>
                        <A title={ t("openInGitHub") } to={ source } className={ "!text-inherit" }><GitHub /></A>
                    </div>

                    <div className={ "grid grid-flow-col justify-between mb-2" }>
                        <p>{ `${ timeToRead } ${ timeToRead === 1 ? t("minute") : t("minutes") } ${ t("read") }` }</p>
                    </div>

                    <TagsRow tags={ splitCSV(tags ?? "") } />
                </div>

                <div className={ `max-h-[40rem] flex justify-center` }>
                    { image &&
                        <GatsbyImage imgStyle={ { objectFit: "contain" } }
                                     alt={ imageAlt }
                                     image={ image } />
                    }
                </div>

                <div className={ "mx-2 my-4" }>
                    <p>{ description }</p>
                </div>

            </article>

        </div>
    );
};

export default ProjectCard;
