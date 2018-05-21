const path = require('path')

exports.createPAges = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const BlogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter{
            date
            path
            title
            excerpt
            tags
          }
        }
      }
    }
  }`)
  .then(result => {
    if(result.errors){
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges
    pots.forEach(({node}, index) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev: index === 0 ? null : posts{index - 1}.node,
          next: index === (posts.length -1) ? null: posts[index + 1].node
        }
      })
    })
  })
}
