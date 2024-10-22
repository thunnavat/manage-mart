import axios from 'axios'

const API_URL = '/api/products'

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    return error
  }
}

export const addProduct = async product => {
  try {
    const response = await axios.post(API_URL, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    return error
  }
}
