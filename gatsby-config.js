module.exports = {
  siteMetadata: {
    title: `Martin Berg Alstad's website`,
    description: `Martin Berg Alstad's personal website`,
    lang: `en`,
    siteUrl: `https://h600878.github.io/`,
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
              icon: `src/images/icon.png`,
              localize: [
                  {
                      start_url: `/no/`,
                      lang: `no`,
                      name: `Martin Berg Alstads hjemmeside`,
                      short_name: `Martin Berg Alstad`,
                      description: `Martin Berg Alstad sin personlige hjemmeside.`,
                  },
              ]
          },
      },
      "gatsby-plugin-mdx",
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`, // Needed for dynamic images
      `gatsby-plugin-react-helmet`,
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
              host: `https://h600878.github.io/`,
              sitemap: `https://h600878.github.io/sitemap/sitemap-index.xml`,
              policy: [{userAgent: `*`, allow: `/`}]
          }
      },
      "react-feather",
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          "name": "projects",
          "path": `${__dirname}/projects`,
        },
        __key: "pages"
      },
      {
          resolve: 'gatsby-source-filesystem',
          options: {
              "name": "locale",
              "path": `${__dirname}/locales`,
          }
      },
      "i18next",
      {
          resolve: `gatsby-plugin-react-i18next`,
          options: {
              localeJsonSourceName: `locale`,
              languages: [`en`, `no`],
              defaultLanguage: `en`,
              siteUrl: `https://h600878.github.io/`,
              i18nextOptions: {
                  interpolation: {
                      escapeValue: false
                  },
                  keySeparator: false,
                  nsSeparator: false
              },
              pages: []
          }
      }
  ]
};