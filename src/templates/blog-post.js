import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import EmailListForm from '../components/EmailListForm'
import LikeButton from '../components/LikeButton'
import FeaturedPosts from '../components/FeaturedPosts'

export const BlogPostTemplate = ({
  content,
  slug,
  pageContext,
  contentComponent,
  description,
  timeToRead,
  tags,
  date,
  title,
  author,
  isPreview,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const { next, previous } = pageContext
  const nextArticle = next && (
    <Link to={next.fields.slug} style={{ maxWidth: '25%' }}>
      <strong>Next Article</strong> <br />
      {next.frontmatter.title}
    </Link>
  )

  const prevArticle = previous && (
    <Link to={previous.fields.slug} style={{ maxWidth: '25%' }}>
      <strong>Previous Article</strong> <br />
      {previous.frontmatter.title}
    </Link>
  )

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content blog-content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p style={{ marginBottom: '.5em' }}>By {author}</p>
            <div className="post-info">
              <p>
                <small>
                  {date}
                  {timeToRead ? (
                    <span>{` • ${timeToRead} min read`}</span>
                  ) : null}
                </small>
              </p>
              <LikeButton slug={slug} />
            </div>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="prev-next-links-wrapper">
              <div className="prev-next-links">{nextArticle}</div>
              <div className="prev-next-links">{prevArticle}</div>
            </div>

            {!isPreview ? (
              <div>
                <FeaturedPosts />
                <EmailListForm />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  timeToRead: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark: post } = data

  return (
    <Layout
      featuredimage={post.frontmatter.featuredimage}
      pageTitle={post.frontmatter.title}
    >
      <BlogPostTemplate
        content={post.html}
        slug={post.fields.slug}
        pageContext={pageContext}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        timeToRead={post.timeToRead}
        date={post.frontmatter.date}
        helmet={
          <Helmet>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        author={post.frontmatter.author}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        description
        tags
        featuredimage
      }
      fields {
        slug
      }
      timeToRead
    }
  }
`
