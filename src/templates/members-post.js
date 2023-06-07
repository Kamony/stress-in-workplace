import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { PageHeader } from "../components/PageHeader";
import Img from "gatsby-image";

export const MemberTemplate = ({
  content,
  contentComponent,
  image,
  name,
  helmet,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
          {image ? <div className={"is-flex is-justify-content-center is-align-content-center"}>
            <Img
              className={"member-image"}
              fixed={image.childImageSharp.fixed}
              alt={""}
            />
          </div> : null}

        <PageHeader title={name} />
        <div className={"mt-6"}>
            <PageContent content={content} />
        </div>
      </div>
    </section>
  );
};

MemberTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const MembersPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <MemberTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Members">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        name={post.frontmatter.title}
        image={post.frontmatter.image}
      />
    </Layout>
  );
};

MembersPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default MembersPost;

export const pageQuery = graphql`
  query MemberById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        image {
            childImageSharp {
                fixed(width: 324, height: 324) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
      }
    }
  }
`;
