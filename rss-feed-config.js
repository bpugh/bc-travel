module.exports = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
    feeds: [
      {
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.edges.map((edge) => {
            return Object.assign({}, edge.node.frontmatter, {
              description: edge.node.excerpt,
              date: edge.node.frontmatter.date,
              url: site.siteMetadata.siteUrl + edge.node.fields.slug,
              guid: site.siteMetadata.siteUrl + edge.node.fields.slug + edge.node.frontmatter.date,
              custom_elements: [
                {
                  'content:encoded':
                    edge.node.html +
                    `<img src="https://bptest.goatcounter.com/count?p=${edge.node.fields.slug}feed">`,
                },
              ],
            })
          })
        },
        query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
        output: '/rss.xml',
        title: "BC Adventure's RSS Feed",
        // optional configuration to insert feed reference in pages:
        // if `string` is used, it will be used to create RegExp and then test if pathname of
        // current page satisfied this regular expression;
        // if not provided or `undefined`, all pages will have feed reference inserted
        match: '^/blog/',
        // optional configuration to specify external rss feed, such as feedburner
        // link: "https://feeds.feedburner.com/gatsby/blog",
      },
    ],
  },
}
