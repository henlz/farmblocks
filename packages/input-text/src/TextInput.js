import * as React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import styled from "styled-components";
import ReactInputMask from "react-input-mask";
import formInput, { formInputProps } from "@crave/farmblocks-hoc-input";
import withMessages, {
  withMessagesProps
} from "@crave/farmblocks-hoc-validation-messages";

import protectedValue, { protectedValueProps } from "./protectedValue";
const EnhancedInput = compose(withMessages, protectedValue, formInput);

const RegularInput = EnhancedInput("input");
const MaskedInput = EnhancedInput(ReactInputMask);

const Container = styled.div`
  font-family: Lato, sans-serif;
  margin-bottom: 24px;
`;

const TextInput = props => {
  const Input = props.mask ? MaskedInput : RegularInput;

  return (
    <Container>
      <Input {...props} />
    </Container>
  );
};

TextInput.propTypes = {
  ...formInputProps,
  ...protectedValueProps,
  ...withMessagesProps,

  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  mask: PropTypes.string
  // and any other properties to forward to the html input element...
};

TextInput.defaultProps = {
  type: "text"
};

export default TextInput;
