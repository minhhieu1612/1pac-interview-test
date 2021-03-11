import logo from "./logo.svg";
import "./App.css";
import Pagination from "./components/Pagination";
import LazyLoad from "./components/LazyLoad";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          lam qq gi bay gio
        </a>
      </header>
      <Pagination currentPage={8} totalPage={8} numberPageShow={5} />
      {["acadc", "adfad", "adfad", "fadfa", "adfadsf"].map((txt) => (
        <LazyLoad
          wrapStyles={{ width: "300px", height: "200px" }}
          loadingStyles={{ width: "200px" }}
        >
          <div className="abc">{txt}</div>
        </LazyLoad>
      ))}
    </div>
  );
}

export default App;
