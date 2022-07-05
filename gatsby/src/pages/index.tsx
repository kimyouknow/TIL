import Cards from '@/components/Card'
import { graphql } from 'gatsby'

interface PostType {
  node: {
    id: string
    frontmatter: {
      title: string
      summary: string
      date: string
      categories: string[]
      thumbnail: {
        publicURL: string
      }
    }
  }
}

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: PostType[]
    }
  }
}

export default function Info({
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) {
  console.log('edges', edges)
  return (
    <div>
      Info
      <Cards />
    </div>
  )
}

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  }
`
