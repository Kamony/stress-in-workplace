import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

// eslint-disable-next-line
export const IndexPageTemplate = ({ title, subheading, mainpitch }) => {
  return (
    <div>
      <section className="hero is-medium is-primary is-bold has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle has-text-centered">{subheading}</h2>
          </div>
        </div>
      </section>
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="content">
              <div className="columns">
                <div className="column">
                  <a href={"https://www.visegradfund.org"} target={"_blank"}>
                    <img
                      src={
                        "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2018/01/visegrad_fund_logo_supported-by_blue_800px.jpg"
                      }
                      style={{
                        maxHeight: 200,
                      }}
                      alt={"visegrad-logo"}
                    />
                  </a>
                </div>
                <div className="column">
                  <div className="subtitle has-text-centered-mobile">
                    {mainpitch.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        subheading
        mainpitch {
          title
          description
        }
      }
    }
  }
`;
