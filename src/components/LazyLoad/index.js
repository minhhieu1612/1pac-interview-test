import React from "react";
import {
  DEFAULT_FRAME_HEIGHT,
  DEFAULT_FRAME_WIDTH,
  DEFAULT_LOADING_GIF_WIDTH,
  DEFAULT_THRESHOLD,
} from "./constants";
import loadingGif from "./loading.gif";
import "./index.css";

// const LazyLoad = ({ src }) => {
//   const rootRef = useRef();
//   const [isVisible, setIsVisible] = useState(false);
//   const loading =
//     "https://tom.imgix.net/imgix_logo_curvesq.png?auto=compress&q=1&blur=100";

//   useEffect(() => {
//     const defaultIntersectionOptions = {
//       threshold: 0,
//       rootMargin: "0px",
//     };

//     const checkIntersections = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       });
//     };

//     if (!isVisible) {
//       const newIO = new IntersectionObserver(
//         checkIntersections,
//         defaultIntersectionOptions
//       );
//       newIO.observe(rootRef.current);
//       return () => newIO.disconnect();
//     }
//   }, [isVisible]);

//   return (
//     <img
//       height="600px"
//       src={isVisible ? src : loading}
//       ref={rootRef}
//       sizes="(min-width: 1240px) 30vw, 90vw"
//     />
//   );
// };
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
      rootMargin: "0px",
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
        className="lazy-load"
        style={{
          width: (this.props.width || DEFAULT_FRAME_WIDTH) + "px",
          height: (this.props.height || DEFAULT_FRAME_HEIGHT) + "px",
          ...this.props.wrapStyles,
        }}
      >
        {!this.state.visible ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            className="loading"
            src={loadingGif}
            style={{
              width: DEFAULT_LOADING_GIF_WIDTH + "px",
              ...this.props.loadingStyle,
            }}
          />
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}
export default LazyLoad;
