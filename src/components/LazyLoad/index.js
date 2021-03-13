import React from "react";
import {
  DEFAULT_LOADING_GIF_WIDTH,
  DEFAULT_ROOT_MARGIN,
  DEFAULT_THRESHOLD,
} from "./constants";
import loadingGif from "./loading.gif";
import "./index.css";

class LazyLoad extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.refIntersectionObserver = React.createRef();
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const defaultIntersectionOptions = {
      threshold: DEFAULT_THRESHOLD,
      rootMargin: DEFAULT_ROOT_MARGIN,
    };

    const checkIntersections = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setState({ visible: true });
        }
      });
    };

    if (!this.state.visible) {
      this.refIntersectionObserver.current = new IntersectionObserver(
        checkIntersections,
        defaultIntersectionOptions
      );
      this.refIntersectionObserver.current.observe(this.rootRef.current);
    }
  }

  componentWillUnmount() {
    this.refIntersectionObserver.current.disconnect();
  }

  render() {
    return (
      <div
        ref={this.rootRef}
        className={"lazy-load " + (this.state.visible ? "hide" : "")}
        style={this.props.wrapStyles}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          className="loading"
          src={loadingGif}
          style={{
            width: DEFAULT_LOADING_GIF_WIDTH + "px",
            ...this.props.loadingStyles,
          }}
        />
      </div>
    );
  }
}
export default LazyLoad;
