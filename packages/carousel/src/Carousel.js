import * as React from "react";
import PropTypes from "prop-types";
import Image from "@crave/farmblocks-image";
import Text from "@crave/farmblocks-text";

import Container from "./styledComponents/Carousel";

const defaultConfig = {
  width: 656,
  height: 328,
  margin: 20,
  fontSize: 88,
  displayTime: 4,
  transitionTime: 2,
  border: {
    radius: "16px",
    width: "4px",
    color: "rgba(255, 255, 255, 0.56)"
  }
};

class Carousel extends React.Component {
  state = {
    activeItem: 0
  };

  nextItem = () => {
    const activeItem = this.state.activeItem + 1;
    if (activeItem === this.props.imageSet.length) {
      this.clearInterval();
      return this.props.onEnd();
    }
    this.props.onChange(activeItem);
    this.setState({ activeItem });
  };

  componentDidMount = () => {
    this.setInterval();
  };

  componentWillUnmount = () => {
    this.clearInterval();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.imageSet !== this.props.imageSet) {
      this.setState({ activeItem: 0 });
      this.setInterval();
    }
  }

  setInterval = () => {
    if (this.transitionId) {
      return;
    }

    const { displayTime } = { ...defaultConfig, ...this.props.itemConfig };

    this.transitionId = window.setInterval(this.nextItem, displayTime * 1000);
  };

  clearInterval = () => {
    if (this.transitionId) {
      window.clearInterval(this.transitionId);
      delete this.transitionId;
    }
  };

  render() {
    const { imageSet, itemConfig } = this.props;
    const configProps = { ...defaultConfig, ...itemConfig };

    return (
      <Container
        activeItem={this.state.activeItem}
        itemConfig={configProps}
        shouldScale={this.props.scale}
      >
        <ul>
          {imageSet.map((item, index) => {
            const isActive = index === this.state.activeItem;
            return (
              <li key={index} className={isActive ? "active" : ""}>
                <Image
                  className="image"
                  src={item.image}
                  border={configProps.border}
                  width="100%"
                  height="100%"
                />
                <Text size={configProps.fontSize} align="center" title>
                  {item.name}
                </Text>
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }

  static propTypes = {
    imageSet: PropTypes.arrayOf(
      PropTypes.shape({ image: PropTypes.string, name: PropTypes.string })
    ),
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    scale: PropTypes.bool,
    itemConfig: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      margin: PropTypes.number,
      fontSize: PropTypes.number,
      displayTime: PropTypes.number,
      transitionTime: PropTypes.number,
      border: PropTypes.shape({
        width: PropTypes.string,
        radius: PropTypes.string,
        color: PropTypes.string
      })
    })
  };

  static defaultProps = {
    itemConfig: defaultConfig,
    scale: true,
    onChange: () => null,
    onEnd: () => null
  };
}

export default Carousel;
