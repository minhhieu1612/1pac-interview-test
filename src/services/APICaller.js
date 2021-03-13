const BASE_URI = "https://images-api.nasa.gov";

const search = async (params) => {
  let paramsString = "/search";
  if (!params || !params.query) {
    return false;
  }
  paramsString += `?q=${params.query}`;
  Object.entries(params)
    .filter(([key, value]) => key !== "query" && value)
    .forEach(([key, value]) => {
      paramsString += `&${key}=${value}`;
    });
  try {
    const response = await fetch(BASE_URI + paramsString);
    const data = await response.json();

    return { status: true, data };
  } catch (error) {
    return { status: false, error };
  }
};

const APICaller = {
  search,
};

export default APICaller;
