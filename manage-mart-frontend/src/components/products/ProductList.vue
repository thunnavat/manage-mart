<script setup>
import { ref, onBeforeMount } from 'vue'
import { getProducts, deleteProduct } from '@/utils/services/productService.js'
import { getProductCategories } from '@/utils/services/productCategoryService'
import AddProduct from '@/components/products/AddProduct.vue'
import EditProduct from '@/components/products/EditProduct.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import router from '@/router'

const products = ref([])
const productCategories = ref([])
const search = ref('')
const headers = [
  {
    align: 'start',
    key: 'productBarcode',
    title: 'บาร์โค้ดสินค้า',
    sortable: false,
  },
  { key: 'productName', title: 'ชื่อสินค้า' },
  { key: 'productCost', title: 'ราคาทุน' },
  { key: 'productPrice', title: 'ราคาขาย' },
  { key: 'productQuantity', title: 'จำนวน' },
  { key: 'productExpirationDate', title: 'วันหมดอายุ' },
  { key: 'productCategoryId', title: 'หมวดหมู่' },
  { key: 'actions', title: 'การดำเนินการ', sortable: false },
]

onBeforeMount(async () => {
  products.value = await getProducts().then(response => response.data)
  productCategories.value = await getProductCategories().then(
    response => response.data,
  )
})

const barcode = ref('')
const interval = ref()
document.addEventListener('keydown', event => {
  if (interval.value) {
    clearInterval(interval.value)
  }
  if (event.code === 'Enter') {
    console.log(barcode.value)
    if (barcode.value) {
      search.value = barcode.value
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

const deleteProductHandler = async productBarcode => {
  const response = await deleteProduct(productBarcode)
  if (response.status === 200) {
    router.go()
  } else {
    alert('ลบสินค้าไม่สำเร็จ')
  }
}
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="#42b983"
        text="เพิ่มสินค้า"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <AddProduct :product-categories="productCategories" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="ยกเลิก"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

  <BaseHeader text="รายการสินค้า" />

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
    :items="products"
    :headers="headers"
    :search="search"
  >
    <template v-slot:[`item.productCategoryId`]="{ item }">
      {{
        productCategories.find((category) => category.productCategoryId === item.productCategoryId)
          ?.productCategoryName
      }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-icon
            v-bind="activatorProps"
            size="small"
            class="mr-2"
          >
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <EditProduct
              :product="item"
              :product-categories="productCategories"
            />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="ยกเลิก"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-icon
            v-bind="activatorProps"
            size="small"
            color="red"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-title>คุณต้องการจะลบสินค้าใช่หรือไม่</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                text="ลบ"
                @click="deleteProductHandler(item.productBarcode)"
              ></v-btn>
              <v-btn
                text="ยกเลิก"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<style scoped>
.v-card {
  padding: 16px;
}
</style>
