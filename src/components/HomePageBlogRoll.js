import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { BlogRoll } from './BlogRoll'

/**
 * Currently this component only differs from the base `BlogRoll` in that it only
 * retrieves 4 posts instead of all of them in graphql query.
 * Unfortunately there currently isn't anyway in gatsby to reuse the static query by passing an
 * argument
 */
export default () => (
  <StaticQuery
    query={graphql`
      query HomePageBlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 4
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              timeToRead
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
