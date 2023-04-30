import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { HTMLContent } from "../components/Content";

import { remark } from "remark";
import remarkHTML from "remark-html";
import { PageHeader } from "../components/PageHeader";

export const toHTML = (value) =>
  remark().use(remarkHTML).processSync(value).toString();

const LeftColumnMember = ({ imageInfo, name, text, url }) => (
  <div className="box">
    <a href={url} target={"__blank"}>
      <div className="columns">
        <div className="column">
          <PreviewCompatibleImage imageInfo={imageInfo} />
        </div>
        <div className="column">
          <h1 className="subtitle has-text-centered">{name}</h1>
          <div className="is-divider" />
          <HTMLContent className={"content"} content={toHTML(text)} />
        </div>
      </div>
    </a>
  </div>
);

export const TeamPageTemplate = ({ title, members }) => (
  <>
    <PageHeader title={title} />
    <section className="section section--gradient">
      <div className="container">
        <div className="content">
          <div className="section">
            {members.map((member, index) => (
              <LeftColumnMember
                key={index}
                name={member.name}
                text={member.text}
                url={member.url}
                imageInfo={member.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

const TeamPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  console.log({ frontmatter });
  return (
    <Layout>
      <TeamPageTemplate
        title={frontmatter.title}
        members={frontmatter.members}
      />
    </Layout>
  );
};

TeamPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default TeamPage;

export const teamPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        templateKey
        title
        members {
          name
          text
          url
          image
        }
      }
    }
  }
`;
