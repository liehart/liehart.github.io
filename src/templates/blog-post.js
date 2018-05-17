import React from "react";
import Helmet from "react-helmet";
import { Container, Header } from "semantic-ui-react";

const blogpost = ({ data }) => {
  const site = data.site.siteMetadata;
  const post = data.markdownRemark;

  return (
    <div className="blog-post-container">
      <Helmet title={`${post.frontmatter.title} - ${site.title}`}>
        <meta charset="utf-8" />
        <meta name="description" content={site.description} />
        <meta
          property="og:url"
          content={`${site.siteUrl}${post.frontmatter.path}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta
          property="article:author"
          content="https://www.facebook.com/vriyas29"
        />
        <meta
          property="article:published_time"
          content={post.frontmatter.date}
        />
      </Helmet>
      <Container text>
        <Header as="h1">{post.frontmatter.title}</Header>
        <p>
          Posted on <b>{post.frontmatter.date}</b>
        </p>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Container>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

export default blogpost;
