<script setup>
import { ref, onBeforeMount } from 'vue'
import { getProducts, deleteProduct } from '@/utils/services/productService.js'
import AddProduct from '@/components/products/AddProduct.vue'

const products = ref([])
const search = ref('')
const headers = [
  {
    align: 'start',
    key: 'productId',
    title: 'รหัสสินค้า',
    sortable: false,
  },
  { key: 'productName', title: 'ชื่อสินค้า' },
  { key: 'productCost', title: 'ราคาทุน' },
  { key: 'productPrice', title: 'ราคาขาย' },
  { key: 'productQuantity', title: 'จำนวน' },
  { key: 'actions', title: 'การดำเนินการ', sortable: false },
]

onBeforeMount(async () => {
  products.value = await getProducts().then((response) => response.data)
})
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
        <AddProduct />
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

  <v-data-table
    :items="products"
    :headers="headers"
    :search="search"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        @click="editProduct(item)"
        size="small"
        class="mr-2"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        @click="deleteProduct(item.productId)"
        size="small"
        color="red"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<style scoped>
.v-card {
  padding: 16px;
}
</style>
