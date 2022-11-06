import { ChangeEventHandler, CSSProperties, MouseEventHandler, ReactNode } from "react";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { Operator } from "../classes/operator";

export interface Component {
    className?: string,
    style?: CSSProperties,
    id?: string,
    name?: string,
    key?: string,
}

export interface ChildComponent extends Component {
    children?: ReactNode,
}

export interface TitleComponent extends ChildComponent {
    title?: string,
}

export interface InputComponent<T> extends TitleComponent {
    onChange?: ChangeEventHandler<T>,
    placeholder?: string,
    required?: boolean,
    type?: string,
}

export interface ButtonComponent<T> extends ChildComponent {
    onClick?: MouseEventHandler<T>,
    hoverTitle?: string,
}

export interface LinkComponent extends TitleComponent {
    to?: string,
}

export interface ProjectPostInterface {
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

export type Theme = "auto" | "dark" | "light";

export type Expression = {
    leading: string,
    left: Expression | null,
    operator: Operator | null,
    right: Expression | null,
    trailing: string,
    atomic: string | null,
}

export type OrderOfOperations = {
    before: string,
    after: string,
    law: string,
}[]
