import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
  const imageStyle = { borderRadius: "5px" };
  console.log({ imageInfo });

  const image = getImage(imageInfo);

  const { alt = "", childImageSharp } = imageInfo;

  if (!!image) {
    return <GatsbyImage image={image} style={imageStyle} alt={alt} />;
  } else if (!!childImageSharp) {
    return (
      <GatsbyImage
        image={childImageSharp.gatsbyImageData}
        style={imageStyle}
        alt={alt}
      />
    );
    // for Netlify CMS
  } else if (image) {
    return <img style={{ imageStyle }} src={image} alt={alt} />;
  } else {
    return null;
  }
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
