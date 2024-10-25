<script setup>
import { ref } from 'vue'
import { addProduct } from '@/utils/services/productService.js'
import BaseHeader from '@/components/BaseHeader.vue'

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

const resetForm = () => {
  this.$refs.form.reset()
  this.$refs.form.resetValidation()
  newProduct.value = {
    productId: '',
    productName: '',
    productCost: '',
    productPrice: '',
    productQuantity: '',
  }
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
  if (response.status === 201) {
    resetForm()
    alert('เพิ่มสินค้าสำเร็จ')
  } else {
    alert('เพิ่มสินค้าไม่สำเร็จ')
  }
}
</script>

<template>
  <div>
    <BaseHeader text="เพิ่มสินค้า" />
    <v-form ref="form">
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
        type="submit"
        @click="addProductHandler"
        block
      >
        เพิ่มสินค้า
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped></style>
