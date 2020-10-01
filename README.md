# BC Travel

[![Netlify Status](https://api.netlify.com/api/v1/badges/c719e0da-748d-48c0-b049-011fbef0b962/deploy-status)](https://app.netlify.com/sites/bc-travel/deploys)

**Note:** This site was originally forked from the [Netlify cms Gatsby starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms)

This site is built with [Gatsby v2](https://www.gatsbyjs.org/blog/2018-09-17-gatsby-v2/) and follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

NetlifyCMS is used to help manage content and since it's a media heavy travel blog, most of the images are hosted on Cloudinary.

## Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

## Running Locally

``` bash
git clone https://github.com/bpugh/bc-travel.git
cd bc-travel
yarn
yarn start
```

To test the CMS portion locally, you'll need run a production build of the site:

``` bash
yarn build
```

### Setting up the CMS

Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

## Debugging

Windows users might encounter `node-gyp` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.

``` bash
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')

MacOS users might also encounter some errors, for more info check [node-gyp](https://github.com/nodejs/node-gyp). I recommend using the latest stable node version.

## CONTRIBUTING

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).
