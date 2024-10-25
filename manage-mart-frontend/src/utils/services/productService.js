import axios from 'axios'

const host = import.meta.env.PROD ? import.meta.env.VITE_APP_PROD_API_URL : import.meta.env.VITE_APP_DEV_API_URL
const API_URL = `${host}/products`

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response
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
    return response
  } catch (error) {
    return error
  }
}

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export const deleteProduct = async id => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response
  } catch (error) {
    return error
  }
}
