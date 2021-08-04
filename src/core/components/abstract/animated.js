import React from 'react';

export class Animated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closing: false,
    };
    this.timer = false;
  }

  static DURATION = 400;

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  close = (cb = () => {}) => {
    clearTimeout(this.timer);
    if (this.view && this.view.zoomOut) {
      this.view.zoomOut();
    }
    this.setState({ closing: true }, () => {
      this.timer = setTimeout(() => {
        if (cb && typeof cb === 'function') {
          cb();
        }
      }, Animated.DURATION);
    });
  };

  render() {
    return false;
  }
}

export default Animated;
