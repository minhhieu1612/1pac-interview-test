import React from "react";
import "./index.css";

const DEFAULT_FIRST_PAGE = 1;
const DEFAULT_STATE = {
  CURRENT_PAGE: 1,
  TOTAL_PAGE: 1,
  NUMBER_PAGE_SHOW: 1,
};
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
      totalPage: this.props.totalPage,
      numberPageShow: this.props.numberPageShow,
    };
  }

  componentDidMount() {
    this.checkParameter();
    this.calculatePage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalPage !== this.props.totalPage) {
      this.setState(
        {
          currentPage: this.props.currentPage,
          totalPage: this.props.totalPage,
          numberPageShow: this.props.numberPageShow,
        },
        () => this.calculatePage()
      );
    }
  }

  checkParameter = () => {
    if (
      typeof this.state.totalPage !== "number" ||
      typeof this.state.currentPage !== "number" ||
      typeof this.state.numberPageShow !== "number"
    ) {
      throw Error("The type of parameter passed is incorrect!!!");
    }

    if (
      this.state.currentPage > this.state.totalPage ||
      this.state.currentPage < DEFAULT_FIRST_PAGE
    ) {
      throw Error("Parameter 'currentPage' is out of range!!!");
    }

    if (this.state.numberPageShow < DEFAULT_FIRST_PAGE) {
      throw Error("Parameter 'numberPageShow' is out of range!!!");
    }
  };

  calculatePage = () => {
    if (this.state.numberPageShow > this.state.totalPage) {
      this.setState({
        numberPageShow: this.state.totalPage,
        lastPage: this.state.totalPage,
        firstPage: DEFAULT_FIRST_PAGE,
        middlePage: this.state.totalPage / 2 + 1,
      });
      return;
    }

    if (
      this.state.currentPage + (this.state.numberPageShow / 2 + 1) >=
      this.state.totalPage
    ) {
      this.setState({
        lastPage: this.state.totalPage,
        firstPage: this.state.totalPage - this.state.numberPageShow + 1,
        middlePage: (this.state.firstPage + this.state.lastPage) / 2,
      });
      return;
    }
    if (this.state.currentPage - (this.state.numberPageShow / 2 + 1) < 1) {
      this.setState({
        firstPage: 1,
        lastPage: this.state.numberPageShow,
        middlePage: (this.state.firstPage + this.state.lastPage) / 2,
      });
      return;
    }

    this.setState({
      firstPage:
        this.state.currentPage - parseInt(this.state.numberPageShow / 2),
      lastPage:
        this.state.currentPage + parseInt(this.state.numberPageShow / 2),
      middlePage: (this.state.firstPage + this.state.lastPage) / 2,
    });
  };

  handleChangePage = (pageSelected) => {
    if (pageSelected < 1 || pageSelected > this.state.totalPage) {
      return;
    }

    this.props.onChangePage(pageSelected, () => {
      this.setState({ currentPage: pageSelected }, () => {
        (this.state.currentPage > this.state.lastPage ||
          this.state.currentPage < this.state.firstPage) &&
          this.calculatePage();
      });
    });
  };

  renderPaginationItem = () => {
    const listPage = [];
    for (
      let index = this.state.firstPage;
      index <= this.state.lastPage;
      index++
    ) {
      listPage.push(index);
    }

    return listPage;
  };

  render() {
    return (
      <div className="pagination">
        <div
          className="pagination-item first"
          onClick={() => this.handleChangePage(1)}
        >
          &lt;&lt;
        </div>
        <div
          className="pagination-item previous"
          onClick={() => this.handleChangePage(this.state.currentPage - 1)}
        >
          &lt;
        </div>
        {this.renderPaginationItem().map((index) => (
          <div
            key={index}
            className={
              "pagination-item " +
              (index === this.state.currentPage ? "active" : "")
            }
            onClick={() => this.handleChangePage(index)}
          >
            {index}
          </div>
        ))}
        <div
          className="pagination-item next"
          onClick={() => this.handleChangePage(this.state.currentPage + 1)}
        >
          &gt;
        </div>
        <div
          className="pagination-item last"
          onClick={() => this.handleChangePage(this.state.totalPage)}
        >
          &gt;&gt;
        </div>
      </div>
    );
  }
}

export default Pagination;
