import axios from "axios";

const API = "42jj4wxCBrZoXN15z212qjlcN3HitsRIjGiPjG4CYBtaAKdG6c19lPh8";

export const getImages = async (searchTerm = "programming") => {
  const response = await axios.get(
    `https://api.pexels.com/v1/search?query=${searchTerm}`,
    {
      headers: {
        Authorization: API,
      },
    }
  );
  return response;
};
