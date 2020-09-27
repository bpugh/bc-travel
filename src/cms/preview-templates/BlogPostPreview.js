import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    author={entry.getIn(['data', 'author'])}
    pageContext={{}}
    description={entry.getIn(['data', 'description'])}
    date={entry.getIn(['data', 'date']).toLocaleDateString()}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    isPreview={true}
  />
)

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
