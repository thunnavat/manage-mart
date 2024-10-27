import axios from "axios";

const API_URL = `${import.meta.env.VITE_APP_API_URL}/product-categories`;

export const getProductCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response;
    } catch (error) {
        return error;
    }
    }