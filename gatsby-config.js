const site = require("./gatsby-config");
module.exports = {
  siteMetadata: {
    title: `Martin Berg Alstads hjemmeside`,
    description: `Martin Berg Alstad sin personlige hjemmeside.`,
    lang: `no`,
    siteUrl: `https://h600878.github.io/`,
  },
  plugins: [
      {
          resolve: `gatsby-plugin-manifest`,
          options: {
              name: `Martin Berg Alstads hjemmeside`,
              short_name: `Martin Berg Alstad`,
              description: `Martin Berg Alstad sin personlige hjemmeside.`,
              lang: `no`,
              start_url: `/`,
              background_color: `#181a1b`,
              theme_color: `#9e6ecf`,
              display: `standalone`,
              icon: `src/images/icon.png`,
              localize: [
                  {
                      start_url: `/en/`,
                      lang: `en`,
                      name: `Martin Berg Alstad's website`,
                      short_name: `Martin Berg Alstad`,
                      description: `Martin Berg Alstad's personal website`,
                  },
              ]
          },
      },
      "gatsby-plugin-mdx",
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`, // Needed for dynamic images
      `gatsby-plugin-react-helmet`,
      'gatsby-plugin-robots-txt',
      `gatsby-plugin-sitemap`,
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          "name": "projects",
          "path": `${__dirname}/projects`
        },
        __key: "pages"
      },
  ]
};