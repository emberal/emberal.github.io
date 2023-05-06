type Setter<T> = import("react").Dispatch<import("react").SetStateAction<T>>;

type Component<T = ComponentProps> = (props: T) => JSX.Element;

interface ComponentProps {
    className?: string,
    style?: import("react").CSSProperties,
    id?: string,
    name?: string | null,
}

interface ChildProps extends ComponentProps {
    children?: import("react").ReactNode,
}

interface SingleChildProps<T extends HTMLElement = HTMLElement> extends ComponentProps {
    children?: import("react").ReactElement<T>
}

interface TitleProps extends ChildProps {
    title?: string | null,
}

interface InputProps<T extends HTMLElement = HTMLInputElement> extends TitleProps {
    onChange?: import("react").ChangeEventHandler<T>,
    placeholder?: string | null,
    required?: boolean,
    type?: string,
}

interface ButtonProps<T extends HTMLElement = HTMLButtonElement> extends ChildProps {
    onClick?: import("react").MouseEventHandler<T>,
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
                        readonly gatsbyImageData?: import("gatsby-plugin-image").IGatsbyImageData
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
    readonly children: import("react").ReactNode,
}

type Theme = "auto" | "dark" | "light";
