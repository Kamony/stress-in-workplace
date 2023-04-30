import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import Img from "gatsby-image";
import { toHTML } from "./team-page";
import { PageHeader } from "../components/PageHeader";

const LeftColumnMember = ({ imgSrc, name, text }) => (
  <div className="column is-full">
    <div className="card">
      <div className="card-header">
        <div className="card-header-title is-centered">
          {/*<p className="title is-centered">{name}</p>*/}
          {name}
        </div>
      </div>
      <div className="card-image is-narrow">
        <figure className="image is-4by3">
          <img src={imgSrc} alt={"activity image"} />
        </figure>
      </div>
      <div className="card-content">
        <HTMLContent content={toHTML(text)} />
      </div>
    </div>
  </div>
);

export const ActivitiesPageTemplate = ({ title, activities }) => {
  console.log(activities);
  return (
    <>
      <PageHeader title={title} />
      <section className="section section--gradient">
        <div className="container">
          <div className="content">
            <div className="section">
              {activities.map((member, index) => (
                <LeftColumnMember
                  key={index}
                  name={member.name}
                  text={member.text}
                  imgSrc={member.image}
                />
              ))}
            </div>
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
          image
        }
      }
    }
  }
`;
