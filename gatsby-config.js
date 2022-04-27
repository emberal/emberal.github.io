module.exports = {
  siteMetadata: {
    title: `martials-website`,
    siteUrl: `https://www.yourdomain.tld`,
    pathPrefix: "/martials-website",
  },
  plugins: ["gatsby-plugin-mdx", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};