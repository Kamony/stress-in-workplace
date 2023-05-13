import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { BlogPostTemplate } from "./blog-post";
import { PageHeader } from "../components/PageHeader";

export const MemberTemplate = ({
  content,
  contentComponent,
  title,
  helmet,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <PageContent content={content} />
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
      <PageHeader title={post.frontmatter.title} />
      <MemberTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Members">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        title={post.frontmatter.title}
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
      }
    }
  }
`;
