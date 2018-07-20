import * as React from "react";
import PropTypes from "prop-types";
import StyledCard from "./styledComponents/Card";
import { cardTypes } from "./constants/cardTypes";

const Card = props => {
  return <StyledCard {...props} />;
};

Card.defaultProps = {
  width: "100%",
  padding: "16px",
  overflow: "hidden"
};

Card.propTypes = {
  floating: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(cardTypes)),
  children: PropTypes.node,
  width: PropTypes.string,
  padding: PropTypes.string,
  overflow: PropTypes.string
};
export default Card;
