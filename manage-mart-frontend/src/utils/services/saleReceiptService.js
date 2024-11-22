import axios from 'axios'

const API_URL = `${import.meta.env.VITE_APP_API_URL}/sales-receipts`

export const addSaleReceipt = async saleReceipt => {
  try {
    const response = await axios.post(API_URL, saleReceipt, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error(error)
  }
}
