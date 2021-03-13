import React from "react";
import "./index.css";
import { requireQueryFieldMessage } from "./messages";

const currentYear = new Date().getFullYear();
const DEFAULT_STATE = {
  QUERY: "",
  LOCATION: "",
  TITLE: "",
  START_YEAR: currentYear,
  END_YEAR: currentYear,
  ERROR_MESSAGE: false,
};

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: DEFAULT_STATE.QUERY,
      location: DEFAULT_STATE.LOCATION,
      title: DEFAULT_STATE.TITLE,
      startYear: DEFAULT_STATE.START_YEAR,
      endYear: DEFAULT_STATE.END_YEAR,
      errorMessage: DEFAULT_STATE.ERROR_MESSAGE,
    };
  }

  handleOnChange = ({ name, value }) => {
    this.setState({ [name]: value });
  };

  validateData = () => {
    if (!this.state.query) {
      this.setState({ errorMessage: requireQueryFieldMessage });
      return false;
    }

    this.setState({ errorMessage: DEFAULT_STATE.ERROR_MESSAGE });
    return true;
  };

  handleClearForm = () => {
    this.setState({
      query: DEFAULT_STATE.QUERY,
      location: DEFAULT_STATE.LOCATION,
      title: DEFAULT_STATE.TITLE,
      startYear: DEFAULT_STATE.START_YEAR,
      endYear: DEFAULT_STATE.END_YEAR,
      errorMessage: DEFAULT_STATE.ERROR_MESSAGE,
    });
  };

  formatData = () => {
    return {
      query: this.state.query,
      location: this.state.location,
      title: this.state.title,
      startYear: Number(this.state.startYear),
      endYear: Number(this.state.endYear),
    };
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    if (this.validateData()) {
      this.props.onSubmitData && this.props.onSubmitData(this.formatData());
    }
  };

  render() {
    return (
      <form className="form form-search" onSubmit={this.handleSubmitForm}>
        <div className="form-header">
          <h3 className="form-header__title">Search Nasa Data</h3>
          {this.state.errorMessage && (
            <span className="message-error">{this.state.errorMessage}</span>
          )}
        </div>
        <div className="form-group">
          <label
            htmlFor="query"
            className="form-group__label form-group__label-required"
          >
            Search Query
          </label>
          <input
            id="query"
            name="query"
            type="text"
            className="form-group__input"
            value={this.state.query}
            onChange={(event) =>
              this.handleOnChange({
                name: event.target.name,
                value: event.target.value,
              })
            }
            placeholder="apollo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="form-group__label">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className="form-group__input"
            value={this.state.location}
            onChange={(event) =>
              this.handleOnChange({
                name: event.target.name,
                value: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="title" className="form-group__label">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-group__input"
            value={this.state.title}
            onChange={(event) =>
              this.handleOnChange({
                name: event.target.name,
                value: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="startYear" className="form-group__label">
            Start Year
          </label>
          <input
            id="startYear"
            name="startYear"
            type="number"
            min="1000"
            max="3000"
            className="form-group__input"
            value={this.state.startYear}
            onChange={(event) =>
              this.handleOnChange({
                name: event.target.name,
                value: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="endYear" className="form-group__label">
            End Year
          </label>
          <input
            id="endYear"
            name="endYear"
            type="number"
            min="1000"
            max="3000"
            className="form-group__input"
            value={this.state.endYear}
            onChange={(event) =>
              this.handleOnChange({
                name: event.target.name,
                value: event.target.value,
              })
            }
          />
        </div>
        <div className="wrap-btn">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.handleClearForm}
          >
            Clear
          </button>
        </div>
      </form>
    );
  }
}
