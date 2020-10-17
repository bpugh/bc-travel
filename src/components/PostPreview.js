import React from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

export class PostPreview extends React.Component {
  render() {
    const { post } = this.props

    return (
      <div className="is-parent column is-6">
        <article className={`blog-list-item tile is-child box notification`}>
          <header>
            {post.frontmatter.featuredimage ? (
              <div className="featured-thumbnail">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.frontmatter.featuredimage,
                    alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                  }}
                />
              </div>
            ) : null}
            <p className="post-meta">
              <Link
                className="title has-text-primary is-size-4"
                to={post.fields.slug}
              >
                {post.frontmatter.title}
              </Link>
              <span> &bull; </span>
              <small>{post.timeToRead} min read</small>
              <span className="subtitle is-size-5 is-block">
                {post.frontmatter.date}
              </span>
            </p>
          </header>
          <p>{post.excerpt}</p>
        </article>
      </div>
    )
  }
}
