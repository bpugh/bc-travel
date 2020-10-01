import React from 'react'
import { Link } from 'gatsby'

import instagram from '../img/social/instagram.svg'
import youtube from '../img/social/youtube.svg'
import etsy from '../img/social/etsy.svg'
import github from '../img/social/github.svg'
import rss from '../img/social/rss.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div style={{ maxWidth: '100vw' }} className="columns">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/tags">
                        Tags
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <a
                  title="Our Instagram"
                  href="https://instagram.com/chrismasuda1177/"
                >
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a
                  title="Our Youtube"
                  href="https://www.youtube.com/channel/UCKhkLO3wV7udkL-xQj_EfLA"
                >
                  <img
                    src={youtube}
                    alt="Youtube"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a
                  title="Chris's Etsy Shop"
                  href="https://www.etsy.com/shop/MidoriTiger"
                >
                  <img
                    src={etsy}
                    alt="etsy icon"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a
                  title="Source code"
                  href="https://github.com/bpugh/bc-travel"
                >
                  <img
                    src={github}
                    alt="github icon"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a
                  title="RSS feed"
                  href="/rss.xml"
                >
                  <img
                    src={rss}
                    alt="rss icon"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
            </div>
            <div>
              Built with ❤ with <a href="https://www.gatsbyjs.com/">Gatsby</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
