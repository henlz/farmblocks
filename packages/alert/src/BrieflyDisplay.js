//@flow
import * as React from "react";
import PropTypes from "prop-types";

const DEFAULT_TIME = 2000;

class BrieflyDisplay extends React.Component<Object, Object> {
  static propTypes = {
    time: PropTypes.number,
    autoRemove: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    time: DEFAULT_TIME,
    autoRemove: true
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      isVisible: true,
      timeoutId: 0
    };
  }

  componentDidMount() {
    const timeoutId = window.setTimeout(() => {
      this.setState({
        isVisible: false
      });
    }, this.props.time);
    this.setState({ timeoutId });
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.timeoutId);
  }

  render() {
    if (!this.state.isVisible && this.props.autoRemove) {
      return null;
    }
    return this.props.children;
  }
}

export default BrieflyDisplay;
