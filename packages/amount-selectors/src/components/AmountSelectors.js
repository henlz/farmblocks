import * as React from "react";
import PropTypes from "prop-types";
import Button, { buttonTypes, buttonSizes } from "@crave/farmblocks-button";
import InputText from "@crave/farmblocks-input-text";
import { fontSizes } from "@crave/farmblocks-theme";
import values from "object.values";

import selectorSizes from "../constants/selectorSizes";
import Wrapper from "../styledComponents/AmountSelector";

const selectorSizeToButtonSize = {
  [selectorSizes.SMALL]: buttonSizes.SMALL,
  [selectorSizes.MEDIUM]: buttonSizes.MEDIUM
};

const selectorSizeToFontSize = {
  [selectorSizes.SMALL]: fontSizes.SMALL,
  [selectorSizes.MEDIUM]: fontSizes.MEDIUM
};

class AmountSelectors extends React.Component {
  state = {
    value: this.props.value,
    disableBoth: false,
    displayValue: this.props.value
  };

  // Conditions to disable both buttons,
  // see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
  disableBoth = validity => validity.badInput || validity.stepMismatch;

  onChange = (event, cb) => {
    const value = typeof event === "number" ? event : event.target.value;
    const hasBrowserValidation =
      event.target && event.target.validity !== undefined;
    const disableBoth =
      !!hasBrowserValidation && this.disableBoth(event.target.validity);

    this.setState({ value, disableBoth }, cb);
    return this.props.onChange(value);
  };

  updateDisplayValue = () => {
    const parsedValue = parseFloat(this.state.value) || 0;
    const validValue = Math.min(
      this.props.max,
      Math.max(this.props.min, parsedValue)
    );

    this.setState({
      value: validValue,
      displayValue: validValue.toFixed(2)
    });

    return this.props.onChange(validValue);
  };

  decrement = () => {
    const value = this.state.value - this.props.step;

    this.onChange(Math.max(value, this.props.min), this.updateDisplayValue);
  };

  increment = () => {
    const value = this.state.value + this.props.step;

    this.onChange(Math.min(value, this.props.max), this.updateDisplayValue);
  };

  render() {
    return (
      <Wrapper size={this.props.size}>
        <Button
          className="decreaseButton"
          type={buttonTypes.SECONDARY}
          size={selectorSizeToButtonSize[this.props.size]}
          icon="wg-minus"
          disabled={
            this.state.disableBoth || this.state.value <= this.props.min
          }
          onClick={this.decrement}
          noTooltip
        />
        <div className="inputContainer">
          <InputText
            type="number"
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.state.displayValue}
            readOnly={this.props.disableTyping}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            onBlur={this.updateDisplayValue}
            size={4}
            fontSize={selectorSizeToFontSize[this.props.size]}
          />
        </div>
        <Button
          className="increaseButton"
          type={buttonTypes.SECONDARY}
          size={selectorSizeToButtonSize[this.props.size]}
          icon="wg-add"
          disabled={
            this.state.disableBoth || this.state.value >= this.props.max
          }
          onClick={this.increment}
          tooltipText="There is no more available amount."
        />
      </Wrapper>
    );
  }

  static propTypes = {
    value: PropTypes.number,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
    disableTyping: PropTypes.bool,
    size: PropTypes.oneOf(values(selectorSizes))
  };

  static defaultProps = {
    value: 0,
    step: 1,
    min: 0,
    max: Number.MAX_VALUE,
    onChange: () => false,
    disableTyping: false,
    size: selectorSizes.MEDIUM
  };
}

export default AmountSelectors;
