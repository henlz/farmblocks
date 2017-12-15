import * as React from "react";
import PropTypes from "prop-types";
import disabledTooltip, {
  newPropTypes
} from "@crave/farmblocks-hoc-disabled-tooltip";

import buttonSizes from "./constants/buttonSizes";
import buttonTypes from "./constants/buttonTypes";
import StyledButton from "./styledComponents/Button";

const EnhancedButton = disabledTooltip(StyledButton);

const Button = props => {
  const { disabled, icon, text, children, ...buttonProps } = props;

  // @FIXME revisit font icon assets on farmblocks
  const iconName = buttonProps.loading ? "wg-loading" : icon;

  const isDisabled = disabled || buttonProps.loading;
  const showIcon = icon || buttonProps.loading;
  const marginOffset = text !== undefined ? 10 : 0;
  const buttonContent = text || children;
  const isIconOnly = buttonContent === undefined;

  return (
    <EnhancedButton
      disabled={isDisabled}
      isIconOnly={isIconOnly}
      displayBlock={buttonProps.fluid}
      {...buttonProps}
    >
      {showIcon && (
        <div className="icon" style={{ marginRight: marginOffset }}>
          <i className={iconName} />
        </div>
      )}
      {buttonContent}
    </EnhancedButton>
  );
};

    const rightIcon = this.props.rightIcon;
Button.defaultProps = {
  size: buttonSizes.SMALL,
  type: buttonTypes.NEUTRAL,
  tooltipText: "This action is disabled"
};

Button.propTypes = {
  activated: PropTypes.bool,
  icon: PropTypes.string,
  rightIcon: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(Object.keys(buttonSizes)),
  type: PropTypes.oneOf(Object.keys(buttonTypes)),
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  ...newPropTypes
  //... and all properties accepted by the html button
};

export default Button;
