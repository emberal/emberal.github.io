module.exports = {
  siteMetadata: {
    title: `Martin Berg Alstad's Website`,
    siteUrl: `https://h600878.github.io/`,
  },
  plugins: [
      "gatsby-plugin-mdx",
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`, // Needed for dynamic images
      `gatsby-plugin-react-helmet`,
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