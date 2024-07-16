// api.js
import axios from "axios";

const API_URL = "http://localhost:5000"; // Adjust the URL to match your backend server

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/product/new`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/v1/product/${id}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/v1/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};
