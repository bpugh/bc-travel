const Remark = require(`remark`)
const cloudinary = require("cloudinary-core"); 
const utils = require(`../../utils`)
const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true,
})

jest.doMock(`../../utils/`, () => {
  return {
    ...utils,
    getBase64Img: jest.fn().mockReturnValue(`data:image;`),
    buildResponsiveSizes: jest.fn().mockReturnValue({
      base64: `data:image;`,
      aspectRatio: 1,
      srcSet: `srcSet`,
      webpSrcSet: `webpSrcSet`,
      src: `imageUrl`,
      sizes: [`128px`, `250px`],
      density: 140,
      presentationWidth: 600,
      presentationHeight: 450,
    }),
  }
})

const plugin = require(`../../`)

const cloud_name = "bctravel";
const cl = new cloudinary.Cloudinary({cloud_name, secure: true});

const createNode = content => {
  const node = {
    id: 1234,
  }

  const markdownNode = {
    id: `${node.id} >>> MarkdownRemark`,
    children: [],
    parent: node.id,
    internal: {
      content,
      contentDigest: `some-hash`,
      type: `MarkdownRemark`,
    },
  }

  markdownNode.frontmatter = {
    title: ``, // always include a title
    parent: node.id,
  }

  return markdownNode
}

const createPluginOptions = (content, imagePaths = `/`) => {
  const dirName = `not-a-real-dir`
  return {
    files: [].concat(imagePaths).map(imagePath => {
      return {
        absolutePath: `${dirName}/${imagePath}`,
      }
    }),
    markdownNode: createNode(content),
    markdownAST: remark.parse(content),
    cache: { get: jest.fn(), set: jest.fn() },
    getNode: () => {
      return {
        dir: dirName,
      }
    },
    createContentDigest: jest.fn().mockReturnValue(`contentDigest`),
  }
}

jest.mock(`axios`, () => () =>
  Promise.resolve({
    data: {
      pipe: jest.fn(),
      destroy: jest.fn(),
    },
  })
)

jest.mock(`sharp`, () => () => {
  return {
    metadata: jest.fn(() => {
      return {
        width: 200,
        height: 200,
        density: 75,
      }
    }),
  }
})

test(`it returns empty array when 0 images`, async () => {
  const content = `
# hello world
Look ma, no images
  `.trim()

  const result = await plugin(createPluginOptions(content))

  expect(result).toEqual([])
})

test(`it leaves relative images alone`, async () => {
  const imagePath = `images/an-image.jpeg`
  const content = `
![asdf](${imagePath})
  `.trim()

  const result = await plugin(createPluginOptions(content, imagePath))

  expect(result).toEqual([])
})

test(`it leaves non-contentful images alone`, async () => {
  const imagePath = `//google.com/images/an-image.jpeg`
  const content = `
![asdf](${imagePath})
  `.trim()

  const result = await plugin(createPluginOptions(content, imagePath))

  expect(result).toEqual([])
})

test(`it transforms images in markdown`, async () => {
  const imagePath = `https://res.cloudinary.com/bctravel/image/upload/c_scale,f_auto,q_auto,w_1080/v1576493624/IMG_20191202_173458_orrul3.jpg`
  const content = `
![image](${imagePath})
  `.trim()

  const nodes = await plugin(createPluginOptions(content, imagePath))

  expect(nodes.length).toBe(1)

  const node = nodes.pop()
  expect(node.type).toBe(`html`)
  expect(node.value).toMatchSnapshot()
  expect(node.value).not.toMatch(`<html>`)
})

test(`it transforms images with a https scheme in markdown`, async () => {
  const imagePath = `https://res.cloudinary.com/bctravel/image/upload/c_scale,f_auto,q_auto,w_1080/v1576493624/IMG_20191202_173458_orrul3.jpg`
  const content = `
![image](${imagePath})
  `.trim()

  const nodes = await plugin(createPluginOptions(content, imagePath))

  expect(nodes.length).toBe(1)

  const node = nodes.pop()
  expect(node.type).toBe(`html`)
  expect(node.value).toMatchSnapshot()
  expect(node.value).not.toMatch(`<html>`)
})

test(`it generates correct transform url`, async () => {
  const imageUrl = `https://res.cloudinary.com/bctravel/image/upload/c_scale,f_auto,q_auto,w_1080/v1576493624/IMG_20191202_173458_orrul3.jpg`
  const imagePath = utils.getImagePath(imageUrl)
  const newUrl = cl.url(imagePath, { width: 40, crop: 'scale'})

  const expected = `https://res.cloudinary.com/bctravel/image/upload/c_scale,w_40/IMG_20191202_173458_orrul3.jpg`
  expect(newUrl).toBe(expected)

})

test(`it generates correct transform url with subdirectory`, async () => {
  const imageUrl = `https://res.cloudinary.com/bctravel/image/upload/c_scale,f_auto,q_auto,w_1080/v1576493624/subdirectory/IMG_20191202_173458_orrul3.jpg`
  const imagePath = utils.getImagePath(imageUrl)
  const newUrl = cl.url(imagePath, { force_version: false, width: 40, crop: 'scale'})

  const expected = `https://res.cloudinary.com/bctravel/image/upload/c_scale,w_40/subdirectory/IMG_20191202_173458_orrul3.jpg`
  expect(newUrl).toBe(expected)

})

// test(`it transforms multiple images in markdown`, async () => {
//   const imagePaths = [
//     `//images.ctfassets.net/rocybtov1ozk/wtrHxeu3zEoEce2MokCSi/73dce36715f16e27cf5ff0d2d97d7dff/quwowooybuqbl6ntboz3.jpg`,
//     `//images.ctfassets.net/rocybtov1ozk/wtrHxeu3zEoEce2MokCSi/73dce36715f16e27cf5ff0d2d97d7dff/quwowooybuqbl6ntboz3.jpg`,
//   ]

//   const content = `
// ![image 1](${imagePaths[0]})
// ![image 2](${imagePaths[1]})
//   `.trim()

//   const nodes = await plugin(createPluginOptions(content, imagePaths))

//   expect(nodes.length).toBe(imagePaths.length)
// })

// test(`it transforms HTML img tags`, async () => {
//   const imagePath = `//images.ctfassets.net/rocybtov1ozk/wtrHxeu3zEoEce2MokCSi/73dce36715f16e27cf5ff0d2d97d7dff/quwowooybuqbl6ntboz3.jpg`

//   const content = `
// <img src="${imagePath}">
//   `.trim()

//   const nodes = await plugin(createPluginOptions(content, imagePath))

//   expect(nodes.length).toBe(1)

//   const node = nodes.pop()
//   expect(node.type).toBe(`html`)
//   expect(node.value).toMatchSnapshot()
//   expect(node.value).not.toMatch(`<html>`)
// })

test(`it leaves relative HTML img tags alone`, async () => {
  const imagePath = `images/this-was-an-image.jpeg`

  const content = `
<img src="${imagePath}">
  `.trim()

  const nodes = await plugin(createPluginOptions(content, imagePath))
  expect(nodes[0].value).toBe(content)
})

