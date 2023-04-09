import type { ChangeEventHandler, CSSProperties, MouseEventHandler, ReactElement, ReactNode } from "react";
import type { IGatsbyImageData } from "gatsby-plugin-image";

type Component<T = ComponentProps> = (props: T) => JSX.Element;

interface ComponentProps {
    className?: string,
    style?: CSSProperties,
    id?: string,
    name?: string | null,
    key?: string,
}

interface ChildProps extends ComponentProps {
    children?: ReactNode,
}

interface SingleChildProps<T extends HTMLElement = HTMLElement> extends ComponentProps {
    children?: ReactElement<T>
}

interface TitleProps extends ChildProps {
    title?: string | null,
}

interface InputProps<T extends HTMLElement = HTMLInputElement> extends TitleProps {
    onChange?: ChangeEventHandler<T>,
    placeholder?: string | null,
    required?: boolean,
    type?: string,
}

interface ButtonProps<T extends HTMLElement = HTMLButtonElement> extends ChildProps {
    onClick?: MouseEventHandler<T>,
    hoverTitle?: string | null,
}

interface LinkProps extends TitleProps {
    to?: string,
    rel?: string,
    newTab?: boolean,
}

interface ProjectPostInterface {
    readonly data: {
        readonly mdx: {
            readonly frontmatter: {
                readonly hero_image: {
                    readonly childImageSharp: {
                        readonly gatsbyImageData?: IGatsbyImageData
                    }
                },
                readonly title?: string | null,
                readonly description?: string | null,
                readonly source?: string | null,
                readonly hero_image_alt?: string | null,
                readonly uploaded?: string | null,
                readonly tags?: string | null,
            }
        }
    },
    readonly children: ReactNode,
}

type Theme = "auto" | "dark" | "light";
