import React from "react";
import { faEye, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getValueFromNestedObject } from "../../helpers/getValueFromNestedObject";
import Pagination from "../Pagination";
import LazyLoad from "../LazyLoad";
import "./index.css";

const DEFAULT_STATE = {
  TAB_INDEX: 0,
  DATA_ALL: [],
  DATA_LIKED: [],
  DATA_REMOVED: [],
};

const DEFAULT_TAB_KEY = {
  ALL: {
    KEY: 0,
    LABEL: "All",
  },
  LIKED: {
    KEY: 1,
    LABEL: "Liked",
  },
  REMOVED: {
    KEY: 2,
    LABEL: "Removed",
  },
};

const NUMBER_ITEM_SHOW = 10;

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: DEFAULT_STATE.TAB_INDEX,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      console.log("zooo");

      return true;
    }
    return false;
  }

  renderItem = (item) => {
    return (
      <div className="col" key={item.key}>
        <div className="card">
          <LazyLoad />
          <div
            className="card-img"
            style={{
              backgroundImage: `url(${getValueFromNestedObject(
                item,
                "imageSrc"
              )})`,
            }}
          ></div>
          <div className="card-body">
            <h4 className="card-body__title">
              {getValueFromNestedObject(item, "title")}
            </h4>
            <em className="card-body__content">
              {getValueFromNestedObject(item, "description")}
            </em>
            <div className="card-body__option">
              <FontAwesomeIcon
                className="card-body__option--item"
                icon={faEye}
              />
              <FontAwesomeIcon
                className={
                  "card-body__option--item " + (item.liked ? "active" : "")
                }
                onClick={() => {
                  this.props.handleUpdateItem(
                    item.key,
                    {
                      liked: !item.liked,
                    },
                    () => {
                      this.forceUpdate();
                    }
                  );
                }}
                icon={faHeart}
              />
              <FontAwesomeIcon
                className={
                  "card-body__option--item " + (item.removed ? "active" : "")
                }
                onClick={() => {
                  this.props.handleUpdateItem(
                    item.key,
                    {
                      removed: !item.removed,
                    },
                    () => {
                      this.forceUpdate();
                    }
                  );
                }}
                icon={faTrash}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const dataItems = {
      [DEFAULT_TAB_KEY.ALL.KEY]: (this.props.items || []).filter(
        (item) => !Boolean(item.removed)
      ),
      [DEFAULT_TAB_KEY.LIKED.KEY]: (this.props.items || []).filter(
        (item) => Boolean(item.liked) && !Boolean(item.removed)
      ),
      [DEFAULT_TAB_KEY.REMOVED.KEY]: (this.props.items || []).filter((item) =>
        Boolean(item.removed)
      ),
    };

    return (
      <div className="list">
        <div className="list-tab">
          {Object.values(DEFAULT_TAB_KEY).map(({ KEY, LABEL }) => (
            <div
              key={KEY}
              className={
                "list-tab__item " +
                (KEY === this.state.tabIndex ? "active" : "")
              }
              onClick={() => this.setState({ tabIndex: KEY })}
            >
              {LABEL}({dataItems[KEY].length})
            </div>
          ))}
        </div>
        <div className="list-pane">
          {Object.values(DEFAULT_TAB_KEY).map(
            ({ KEY, LABEL }) =>
              this.state.tabIndex === KEY && (
                <div className="list-pane__item">
                  <div className="row">
                    {dataItems[KEY].map((item) => this.renderItem(item))}
                  </div>
                  <Pagination
                    currentPage={1}
                    totalPage={
                      parseInt(dataItems[KEY].length / NUMBER_ITEM_SHOW) + 1
                    }
                    numberPageShow={5}
                  />
                </div>
              )
          )}
          {/* {this.state.tabIndex === DEFAULT_TAB_KEY.ALL.KEY && (
            <div className="list-pane__item">
              <div className="row">
                {dataItems[DEFAULT_TAB_KEY.ALL.KEY].map((item) =>
                  this.renderItem(item)
                )}
              </div>
            </div>
          )}
          {this.state.tabIndex === DEFAULT_TAB_KEY.LIKED.KEY && (
            <div className="list-pane__item">
              <div className="row">
                {dataItems[DEFAULT_TAB_KEY.LIKED.KEY].map((item) =>
                  this.renderItem(item)
                )}
              </div>
            </div>
          )}
          {this.state.tabIndex === DEFAULT_TAB_KEY.REMOVED.KEY && (
            <div className="list-pane__item">
              <div className="row">
                {dataItems[DEFAULT_TAB_KEY.REMOVED.KEY].map((item) =>
                  this.renderItem(item)
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
    );
  }
}
