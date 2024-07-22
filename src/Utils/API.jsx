import axios from "axios";

const Base_URL = "https://api.coincap.io/v2";

export const trendingProducts = async () => {
  try {
    const response = await axios.get(`${Base_URL}/assets`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching trending products:", error);
    throw error;
  }
};

export const showSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${Base_URL}/assets/${id}`);
    const historyResponse = await axios.get(`${Base_URL}/assets/${id}/history?interval=d1`);
    return {
      details: response.data.data,
      history: historyResponse.data.data,
    };
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};
