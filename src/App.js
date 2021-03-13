import "./App.css";
import SearchForm from "./components/SearchForm";
import APICaller from "./services/APICaller";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import ListItem from "./components/ListItem";
import { getValueFromNestedObject } from "./helpers/getValueFromNestedObject";

const DATA_KEY = "NasaData";
function App() {
  const [items, setItems] = useState([]);
  const handleSearch = async (formValues) => {
    const result = await APICaller.search({
      query: formValues.query,
      title: formValues.title,
      year_start: formValues.startYear,
      year_end: formValues.endYear,
    });

    const { status, data, error } = result;
    if (status) {
      const dataFormatted = handleData(data.collection.items);
      localStorage.setItem(DATA_KEY, JSON.stringify(dataFormatted));
      setItems(dataFormatted || []);
    } else {
      console.error(error);
    }
  };

  const handleData = (data) => {
    return data.map((item, index) => ({
      key: uuid(),
      ...getValueFromNestedObject(item, "data.0", {}),
      imageSrc: getValueFromNestedObject(item, "links.0.href"),
      liked: false,
      removed: false,
    }));
  };

  const handleUpdateItem = (key, data, callback) => {
    const indexOfItem = items.findIndex((item) => item.key === key);
    if (indexOfItem < 0) {
      return;
    }
    var dataUpdate = items;
    dataUpdate[indexOfItem] = { ...items[indexOfItem], ...data };
    setItems(dataUpdate);
    localStorage.setItem(DATA_KEY, JSON.stringify(dataUpdate));
    callback();
  };

  useEffect(() => {
    // get data from localStorage to render
    const data = localStorage.getItem(DATA_KEY);
    data && setItems(JSON.parse(data));
  }, []);

  return (
    <div className="App">
      <div className="form-search">
        <SearchForm onSubmitData={handleSearch} />
      </div>
      <hr />
      <ListItem items={items} handleUpdateItem={handleUpdateItem} />
      {/* <Pagination currentPage={8} totalPage={8} numberPageShow={5} />
      {["acadc", "adfad", "adfad", "fadfa", "adfadsf"].map((txt) => (
        <LazyLoad
          wrapStyles={{ width: "300px", height: "200px" }}
          loadingStyles={{ width: "200px" }}
        >
          <div className="abc">{txt}</div>
        </LazyLoad>
      ))} */}
    </div>
  );
}

export default App;
