import axios from 'axios'

const API_URL = `${import.meta.env.VITE_APP_API_URL}/products`

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
