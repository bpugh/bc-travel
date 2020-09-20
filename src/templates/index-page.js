import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import HomePageBlogRoll from '../components/HomePageBlogRoll'
import EmailListForm from '../components/EmailListForm'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  ourLocation,
  asOfDate,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `center`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: '#352d2d',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            color: '#352d2d',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {subheading}
        </h3>
      </div>
    </div>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <div className="content">
                <div className="tile">
                  <h3 className="subtitle">{mainpitch.description}</h3>
                </div>
              </div>
              <div className="box notification" style={{ margin: '2rem 0' }}>
                <p className="is-size-4">Where are we now?</p>
                <p className="is-size-5">
                  <span className="has-text-weight-bold">{ourLocation}</span> as
                  of {asOfDate}
                </p>
              </div>
              <div className="column is-12">
                <h3 className="has-text-weight-semibold is-size-2">
                  Latest stories
                </h3>
                <HomePageBlogRoll />
                <div className="column is-12 has-text-centered">
                  <Link className="btn has-text-primary" to="/blog">
                    Read more
                  </Link>
                </div>
              </div>
              <EmailListForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  ourLocation: PropTypes.string,
  asOfDate: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        ourLocation={frontmatter.ourLocation}
        asOfDate={frontmatter.asOfDate}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        heading
        subheading
        ourLocation
        asOfDate
        mainpitch {
          description
        }
      }
    }
  }
`
