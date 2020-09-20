import React from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

export class PostPreview extends React.Component {
  render() {
    const post = {
      excerpt:
        'So there we were waiting in line at the Siem Reap airport... the US State Department had just issued the unprecedented blanket travel advisory stating that US citizens abroad should not expect help returning to the US if they become stranded in a foreign country. With this, we decided that once we landed in Singapore we would try to fly back home as soon as we could, but little did we know that…',
      id: '20750d2b-f95f-5ecb-978b-c89289716a0a',
      fields: {
        slug: '/blog/2020-04-09-getting-home/',
      },
      timeToRead: 8,
      frontmatter: {
        title: 'Getting Home',
        templateKey: 'blog-post',
        date: 'April 09, 2020',
        featuredpost: null,
        featuredimage:
          'https://res.cloudinary.com/bctravel/image/upload/c_scale,f_auto,q_auto,w_1080/v1598952068/changi/IMG_20200320_174432_syd43u.jpg',
      },
    }

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
