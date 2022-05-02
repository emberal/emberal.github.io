module.exports = {
  siteMetadata: {
    title: `Martin Berg Alstad's Website`,
    siteUrl: `https://h600878.github.io/`,
  },
  plugins: [
      "gatsby-plugin-mdx",
      `gatsby-plugin-react-helmet`,
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          "name": "pages",
          "path": "./src/pages/"
        },
        __key: "pages"
      },
  ]
};