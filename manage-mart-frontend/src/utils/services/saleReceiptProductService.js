import axios from 'axios'

const API_URL = `${import.meta.env.VITE_APP_API_URL}/sales-receipts-products`

export const addSaleReceiptProduct = async saleReceiptProduct => {
  try {
    const response = await axios.post(API_URL, saleReceiptProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    return response
  } catch (error) {
    console.error(error)
  }
}
