<script setup>
import { ref } from 'vue'
import { addProduct } from '@/utils/services/productService.js'

const newProduct = ref({
  productId: '',
  productName: '',
  productCost: '',
  productPrice: '',
  productQuantity: '',
})

const validationRules = {
  productId: [v => !!v || 'รหัสสินค้าไม่สามารถเว้นว่างได้'],
  productName: [v => !!v || 'ชื่อสินค้าไม่สามารถเว้นว่างได้'],
  productCost: [v => !!v || 'ราคาทุนไม่สามารถเว้นว่างได้'],
  productPrice: [v => !!v || 'ราคาสินค้าไม่สามารถเว้นว่างได้'],
  productQuantity: [v => !!v || 'จำนวนสินค้าไม่สามารถเว้นว่างได้'],
}

const addProductHandler = async () => {
  const { productId, productName, productCost, productPrice, productQuantity } =
    newProduct.value
  const product = {
    productId,
    productName,
    productCost,
    productPrice,
    productQuantity,
  }
  const response = await addProduct(product)
  console.log(response)
  // newProduct.value = {
  //   productId: '',
  //   productName: '',
  //   productCost: '',
  //   productPrice: '',
  // }
}
</script>

<template>
  <div>
    <h1>เพิ่มสินค้า</h1>
    <div>
      <v-form>
        <v-text-field
          v-model="newProduct.productId"
          :rules="validationRules.productId"
          label="รหัสสินค้า"
        />
        <v-text-field
          v-model="newProduct.productName"
          :rules="validationRules.productName"
          label="ชื่อสินค้า"
        />
        <v-text-field
          v-model="newProduct.productCost"
          :rules="validationRules.productCost"
          label="ราคาทุน"
        />
        <v-text-field
          v-model="newProduct.productPrice"
          :rules="validationRules.productPrice"
          label="ราคาสินค้า"
        />
        <v-text-field
          v-model="newProduct.productQuantity"
          :rules="validationRules.productQuantity"
          label="จำนวนสินค้า"
        />
        <v-btn
          @click="addProductHandler"
          block
        >
          เพิ่มสินค้า
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<style scoped></style>
