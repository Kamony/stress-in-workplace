import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { toHTML } from "./team-page";
import { PageHeader } from "../components/PageHeader";
import Img from "gatsby-image";

const LeftColumnMember = ({ imageInfo, name, text }) => (
  <div className="block">
    <div className="card">
      <div className="card-header">
        <div className="card-header-title is-centered">{name}</div>
      </div>
      <div className="card-content">
        <div className={"columns"}>
          <div className={"column is-one-quarter"}>
            <Img
              fluid={imageInfo.childImageSharp.fluid}
              object-fit={"cover"}
              style={{ height: "100%", width: "auto" }}
              alt={""}
            />
          </div>
          <div className={"column"}>
            <div className={"content"}>
              <HTMLContent content={toHTML(text)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ActivitiesPageTemplate = ({ title, activities }) => {
  return (
    <>
      <PageHeader title={title} />
      <section className="section section--gradient">
        <div className="container">
          <div
            className="content is-flex is-flex-direction-column"
            style={{ gap: 16 }}
          >
            {activities.map((member, index) => (
              <LeftColumnMember
                key={index}
                name={member.name}
                text={member.text}
                imageInfo={member.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const ActivitiesPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <ActivitiesPageTemplate
        title={frontmatter.title}
        activities={frontmatter.activities}
      />
    </Layout>
  );
};

export default ActivitiesPage;

export const activitiesPageQuery = graphql`
  query ActivitiesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        templateKey
        title
        activities {
          name
          text
          image {
            childImageSharp {
              fluid(maxHeight: 300, maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
