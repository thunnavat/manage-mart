<script setup>
import { ref, onBeforeMount } from 'vue'
import {
  getProductByBarcode,
  updateProduct,
} from '@/utils/services/productService'
import PaymentSelected from './PaymentSelected.vue'
import { addSaleReceipt } from '@/utils/services/saleReceiptService'
import { addSaleReceiptProduct } from '@/utils/services/saleReceiptProductService'
import { getPaymentMethods } from '@/utils/services/paymentMethodService'
import { getProducts } from '@/utils/services/productService'
import dayjs from 'dayjs'
import router from '@/router'

const newSaleReceipt = ref({
  saleReceiptTotalPrice: '',
  saleReceiptDiscount: 0,
  saleReceiptNet: '',
  saleReceiptCash: null,
  saleReceiptChange: null,
  paymentMethodId: '',
  saleReceiptStateWelfareCardCash: null,
  saleReceiptStateWelfareCardDifference: null,
  saleReceiptStateWelfareCardPayDifferenceMethod: null,
})
const products = ref([])
const search = ref(null)
const sellProducts = ref([])
const paymentMethods = ref([])
const payDiffernceMethods = [
  {
    paymentMethodId: 1,
    paymentMethodName: 'เงินสด',
  },
  {
    paymentMethodId: 2,
    paymentMethodName: 'คิวอาร์โค้ด',
  },
]

onBeforeMount(async () => {
  products.value = await getProducts().then(response => response.data)
  paymentMethods.value = await getPaymentMethods().then(
    response => response.data,
  )
})

const headers = [
  {
    align: 'start',
    key: 'productBarcode',
    title: 'บาร์โค้ดสินค้า',
    sortable: false,
  },
  { key: 'productName', title: 'ชื่อสินค้า' },
  { key: 'productPrice', title: 'ราคาขาย' },
  { key: 'actions', title: 'การดำเนินการ', sortable: false },
]

const clearSaleReceipt = () => {
  newSaleReceipt.value.saleReceiptTotalPrice = ''
  newSaleReceipt.value.saleReceiptDiscount = 0
  newSaleReceipt.value.saleReceiptNet = ''
  newSaleReceipt.value.saleReceiptCash = null
  newSaleReceipt.value.saleReceiptChange = null
  newSaleReceipt.value.paymentMethodId = ''
  newSaleReceipt.value.saleReceiptStateWelfareCardCash = null
  newSaleReceipt.value.saleReceiptStateWelfareCardDifference = null
  newSaleReceipt.value.saleReceiptStateWelfareCardPayDifferenceMethod = null
  sellProducts.value = []
  router.go()
}

const totalPriceCalculation = () => {
  newSaleReceipt.value.saleReceiptTotalPrice = sellProducts.value.reduce(
    (totalPrice, sellProduct) => totalPrice + sellProduct.productTotalPrice,
    0,
  )
  newSaleReceipt.value.saleReceiptNet =
    newSaleReceipt.value.saleReceiptTotalPrice -
    newSaleReceipt.value.saleReceiptDiscount
}

const barcode = ref('')
const interval = ref()
document.addEventListener('keydown', event => {
  if (interval.value) {
    clearInterval(interval.value)
  }
  if (event.code === 'Enter') {
    if (barcode.value) {
      const currentSellProductIndex = sellProducts.value.findIndex(
        sellProduct => sellProduct.productBarcode === barcode.value,
      )
      if (currentSellProductIndex !== -1) {
        sellProducts.value[currentSellProductIndex].productQuantity += 1
        sellProducts.value[currentSellProductIndex].productTotalPrice =
          sellProducts.value[currentSellProductIndex].productQuantity *
          sellProducts.value[currentSellProductIndex].productPrice
        sellProducts.value[currentSellProductIndex].productTotalCost =
          sellProducts.value[currentSellProductIndex].productQuantity *
          sellProducts.value[currentSellProductIndex].productCost
        totalPriceCalculation()
      } else {
        getProductByBarcode(barcode.value).then(response => {
          if (response.status === 200) {
            const product = response.data
            const sellProduct = {
              productId: product.productId,
              productBarcode: product.productBarcode,
              productName: product.productName,
              productPrice: Number(product.productPrice),
              productQuantity: 1,
              productTotalPrice: Number(product.productPrice),
              productCost: Number(product.productCost),
              productTotalCost: Number(product.productCost),
            }
            sellProducts.value.push(sellProduct)
            totalPriceCalculation()
          }
        })
      }
    }
    barcode.value = ''
    return
  }
  if (event.key !== 'Shift') {
    barcode.value += event.key
    interval.value = setInterval(() => {
      barcode.value = ''
    }, 100)
  }
})

const quantityChange = (event, index) => {
  sellProducts.value[index].productQuantity = event.target.value
  sellProducts.value[index].productTotalPrice =
    sellProducts.value[index].productQuantity *
    sellProducts.value[index].productPrice
  sellProducts.value[index].productTotalCost =
    sellProducts.value[index].productQuantity *
    sellProducts.value[index].productCost
  totalPriceCalculation()
}

const selectedPaymentHandler = paymentMethodId => {
  newSaleReceipt.value.paymentMethodId = paymentMethodId
}

const changeCash = event => {
  if (
    newSaleReceipt.value.paymentMethodId === 3 &&
    newSaleReceipt.value.saleReceiptStateWelfareCardPayDifferenceMethod ===
      'เงินสด'
  ) {
    newSaleReceipt.value.saleReceiptCash = event.target.value
    newSaleReceipt.value.saleReceiptChange =
      newSaleReceipt.value.saleReceiptCash -
      newSaleReceipt.value.saleReceiptStateWelfareCardDifference
  } else {
    newSaleReceipt.value.saleReceiptCash = event.target.value
    newSaleReceipt.value.saleReceiptChange =
      newSaleReceipt.value.saleReceiptCash - newSaleReceipt.value.saleReceiptNet
  }
}

const stateCardWelfareCashChange = event => {
  newSaleReceipt.value.saleReceiptStateWelfareCardCash = event.target.value
  newSaleReceipt.value.saleReceiptStateWelfareCardDifference =
    newSaleReceipt.value.saleReceiptNet -
    newSaleReceipt.value.saleReceiptStateWelfareCardCash
}

const payDifferenceMethodHandler = payDifferenceMethodId => {
  if (payDifferenceMethodId === 1) {
    newSaleReceipt.value.saleReceiptStateWelfareCardPayDifferenceMethod =
      'เงินสด'
  } else {
    newSaleReceipt.value.saleReceiptStateWelfareCardPayDifferenceMethod =
      'คิวอาร์โค้ด'
  }
}

const saveReceipt = async () => {
  const currentDateTime = dayjs()
  const saleReceiptObject = {
    saleReceiptDate: currentDateTime.format('YYYY-MM-DD'),
    saleReceiptTime: currentDateTime.format('HH:mm:ss'),
    saleReceiptTotalPrice: newSaleReceipt.value.saleReceiptTotalPrice,
    saleReceiptDiscount: newSaleReceipt.value.saleReceiptDiscount,
    saleReceiptNet: newSaleReceipt.value.saleReceiptNet,
    saleReceiptCash: newSaleReceipt.value.saleReceiptCash,
    saleReceiptChange: newSaleReceipt.value.saleReceiptChange,
    paymentMethodId: newSaleReceipt.value.paymentMethodId,
    saleReceiptStateWelfareCardCash:
      newSaleReceipt.value.saleReceiptStateWelfareCardCash,
    saleReceiptStateWelfareCardDifference:
      newSaleReceipt.value.saleReceiptStateWelfareCardDifference,
    saleReceiptStateWelfareCardPayDifferenceMethod:
      newSaleReceipt.value.saleReceiptStateWelfareCardPayDifferenceMethod,
  }
  const saleReceiptResponse = await addSaleReceipt(saleReceiptObject)
  if (saleReceiptResponse.status === 201) {
    const saleReceiptId = saleReceiptResponse.data.saleReceiptId
    const saleProductPromise = sellProducts.value.map(async sellProduct => {
      const saleReceiptProductObject = {
        saleReceiptId: saleReceiptId,
        productId: sellProduct.productId,
        productQuantity: sellProduct.productQuantity,
        productPrice: sellProduct.productPrice,
        productTotalPrice: sellProduct.productTotalPrice,
        productCost: sellProduct.productCost,
        productTotalCost: sellProduct.productTotalCost,
      }
      const saleReceiptProductResponse = await addSaleReceiptProduct(
        saleReceiptProductObject,
      )
      if (saleReceiptProductResponse.status === 201) {
        const productByBarcode = await getProductByBarcode(
          sellProduct.productBarcode,
        )
        const product = {
          productQuantity:
            productByBarcode.data.productQuantity - sellProduct.productQuantity,
        }
        const updateProductResponse = await updateProduct(
          productByBarcode.data.productId,
          product,
        )
        if (updateProductResponse.status !== 200) {
          alert(
            `ชำระเงินไม่สำเร็จ ไม่สามารถอัพเดทจำนวนสินสินค้าได้ กรุณาตรวจสอบจำนวนสินค้าในคลังสินค้า ชื่อสินค้า: ${sellProduct.productName}`,
          )
        }
      } else {
        alert('ชำระเงินไม่สำเร็จ ไม่สามารถสร้างรายการสินค้าในใบเสร็จได้')
      }
    })
    await Promise.all(saleProductPromise)
    alert('ชำระเงินสำเร็จ')
    clearSaleReceipt()
  } else {
    alert('ชำระเงินไม่สำเร็จ ไม่สามารถสร้างใบเสร็จได้')
  }
}

const manualAddProduct = item => {
  const currentSellProductIndex = sellProducts.value.findIndex(
    sellProduct => sellProduct.productBarcode === item.productBarcode,
  )
  if (currentSellProductIndex !== -1) {
    alert('สินค้านี้มีอยู่ในรายการแล้ว')
    return
  } else {
    const sellProduct = {
      productId: item.productId,
      productBarcode: item.productBarcode,
      productName: item.productName,
      productPrice: Number(item.productPrice),
      productQuantity: 1,
      productTotalPrice: Number(item.productPrice),
      productCost: Number(item.productCost),
      productTotalCost: Number(item.productCost),
    }
    sellProducts.value.push(sellProduct)
    totalPriceCalculation()
    search.value = null
  }
}
</script>

<template>
  <div>
    <h1 class="mt-2">ค้นหารายการสินค้า</h1>
    <v-text-field
      v-model="search"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      flat
      hide-details
      single-line
    ></v-text-field>
    <v-data-table
      v-if="search"
      :items="products"
      :headers="headers"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          size="small"
          class="mr-2"
          color="green"
          @click="manualAddProduct(item)"
        >
          mdi-plus-circle
        </v-icon>
      </template>
    </v-data-table>
    <h1 class="mt-2">รายการสั่งซื้อ</h1>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">ลำดับที่</th>
          <th class="text-left">ชื่อสินค้า</th>
          <th class="text-left">ราคาต่อหน่วย</th>
          <th class="text-left">จำนวน</th>
          <th class="text-left">ราคา</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(sellProduct, index) in sellProducts"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ sellProduct.productName }}</td>
          <td>{{ sellProduct.productPrice }}</td>
          <td>
            <input
              type="number"
              :value="sellProduct.productQuantity"
              @change="event => quantityChange(event, index)"
              class="border border-black"
            />
          </td>
          <td>{{ sellProduct.productTotalPrice }}</td>
          <td>
            <v-icon
              size="small"
              color="red"
              @click="sellProducts.splice(index, 1), totalPriceCalculation()"
            >
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
    <h1>สรุปการชำระเงิน</h1>
    <ul>
      <li>ยอดรวมทั้งหมด: {{ newSaleReceipt.saleReceiptTotalPrice }}</li>
      <li>ส่วนลด: {{ newSaleReceipt.saleReceiptDiscount }}</li>
      <li>ยอดรวมสุทธิ: {{ newSaleReceipt.saleReceiptNet }}</li>
      <PaymentSelected
        :payment-methods="paymentMethods"
        :default-payment-method="1"
        @select-payment-method="selectedPaymentHandler"
      />
      <div v-if="newSaleReceipt.paymentMethodId === 3">
        <li>
          ยอดชำระด้วยบัตรสวัสดิการแห่งรัฐ:
          <input
            type="number"
            :value="newSaleReceipt.saleReceiptStateWelfareCardCash"
            @change="event => stateCardWelfareCashChange(event)"
            class="border border-black"
          />
        </li>
        <li>
          ยอดคงเหลือต้องชำระ: {{ newSaleReceipt.saleReceiptStateWelfareCardDifference }}
        </li>
        <li>
          วิธีชำระคงเหลือ:
          <PaymentSelected
            :payment-methods="payDiffernceMethods"
            @select-payment-method="payDifferenceMethodHandler"
          />
        </li>
      </div>
      <div
        v-if="
          newSaleReceipt.paymentMethodId === 1 ||
          newSaleReceipt.saleReceiptStateWelfareCardPayDifferenceMethod ===
            'เงินสด'
        "
      >
        <li>
          เงินสด:
          <input
            type="number"
            :value="newSaleReceipt.saleReceiptCash"
            @change="changeCash"
            class="border border-black"
          />
        </li>
        <li>เงินทอน: {{ newSaleReceipt.saleReceiptChange }}</li>
      </div>
    </ul>
    <v-btn @click="saveReceipt">ชำระเงินสำเร็จ</v-btn>
    <v-btn @click="clearSaleReceipt">ยกเลิกการชำระเงิน</v-btn>
  </div>
</template>

<style scoped></style>
