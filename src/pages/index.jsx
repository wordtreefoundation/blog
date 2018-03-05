import React from 'react';
import Helmet from 'react-helmet';
import Post from '../components/Post';
import Link from 'gatsby-link';
// import Header from '../components/Header';
import Title from '../components/Title';
import Pill from '../components/Pill';
import SidebarHome from '../components/SidebarHome';
import './style.scss'

class IndexRoute extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata;

    const post = this.props.data.allMarkdownRemark.edges[0];

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={subtitle} />
        </Helmet>
        {/* <Header {...this.props} /> */}
        <div style={{ marginTop: 25, marginBottom: 25 }}>
          <Title />
        </div>
        <div className="layout">
        <SidebarHome {...this.props} />
          <div className="content">
            <div className="content__inner">
              <div className="index__articles">
                <h1>News</h1>
                <Post data={post} key={post.node.fields.slug} />
                <Link to="/news/">
                  <h2>See All <Pill>{this.props.data.allMarkdownRemark.edges.length}</Pill> Articles</h2>
                </Link>
              </div>
              <div className="index__projects">
                <h1>Projects</h1>
                <h3><a href="https://www.bookofmormonorigins.com">Book of Mormon Origins</a></h3>
                <p>An open-source, public domain resource that adds missing footnotes to the Book of Mormon.</p>

                <h3><a href="https://wordtreefoundation.github.io/thelatewar/">The Late War Study</a></h3>
                <p>A computer-aided study that reveals some remarkable similarities between the Book of Mormon and The Late War Between the United States and Great Britain (published in 1816).</p>

                <h3><a href="https://github.com/wordtreefoundation/bomdb">BomDB (Book of Mormon Database)</a></h3>
                <p>A resource for computer-aided studies of the Book of Mormon. Contains a command-line tool (Linux/MacOS/Windows) that can be used to find specific verses across multiple editions, or produce full copies (with our without chapter/verse annotations) of each edition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexRoute;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          github
        }
      }
    }
    allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;
