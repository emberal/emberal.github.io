import path from "path";

module.exports = {
    graphqlTypegen: true,
    // trailingSlash: "never", // Default is always
    siteMetadata: {
        title: `Martin Berg Alstad's website`,
        description: `Martin Berg Alstad's personal website and portfolio`,
        lang: `en`,
        siteUrl: `https://emberal.github.io/`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Martin Berg Alstad's website`,
                short_name: `Martin Berg Alstad`,
                description: `Martin Berg Alstad's personal website`,
                lang: `en`,
                start_url: `/`,
                background_color: `#181a1b`,
                theme_color: `#9e6ecf`,
                display: `standalone`,
                icon: `src/images/Martials dog avatar.png`,
                localize: [
                    {
                        start_url: `/no/`,
                        lang: `no`,
                        name: `Martin Berg Alstads hjemmeside`,
                        short_name: `Martin Berg Alstad`,
                        description: `Martin Berg Alstad sin personlige hjemmeside.`,
                    },
                ],
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-remark-images`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 672,
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`, // Needed for dynamic images
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: [`/`, `/projects/*`],
            },
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: `https://emberal.github.io/`,
                sitemap: `https://emberal.github.io/sitemap/sitemap-index.xml`,
                policy: [{ userAgent: `*`, allow: `/` }]
            }
        },
        {
            resolve: 'gatsby-plugin-security-txt',
            options: {
                contact: 'https://emberal.github.io/contact-me',
                expires: '2032-10-14T23:59:59z',
                canonical: 'https://emberal.github.io/.well-known/security.txt',
                languages: 'en, no',
            },
        },
        "react-feather",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "projects",
                "path": path.resolve(`projects`),
            },
            __key: "pages"
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "locale",
                "path": path.resolve(`locales`),
            }
        },
        "i18next",
        'gatsby-plugin-postcss',
    ],
};