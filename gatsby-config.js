module.exports = {
  siteMetadata: {
    title: `martials-website`,
    siteUrl: `https://h600878.github.io/`,
  },
  plugins: [
      "gatsby-plugin-mdx",
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