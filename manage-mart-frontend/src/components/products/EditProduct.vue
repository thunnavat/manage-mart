<script setup>
import { ref } from 'vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { updateProduct } from '@/utils/services/productService'
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const validationRules = {
  productId: [v => !!v || 'รหัสสินค้าไม่สามารถเว้นว่างได้'],
  productName: [v => !!v || 'ชื่อสินค้าไม่สามารถเว้นว่างได้'],
  productCost: [v => !!v || 'ราคาทุนไม่สามารถเว้นว่างได้'],
  productPrice: [v => !!v || 'ราคาสินค้าไม่สามารถเว้นว่างได้'],
  productQuantity: [v => !!v || 'จำนวนสินค้าไม่สามารถเว้นว่างได้'],
}

const editProduct = ref({
  productId: props.product.productId,
  productName: props.product.productName,
  productCost: props.product.productCost,
  productPrice: props.product.productPrice,
  productQuantity: props.product.productQuantity,
})

const editProductHandler = async () => {
  const response = await updateProduct(
    editProduct.value.productId,
    editProduct.value,
  )
  if (response.status === 200) {
    alert('แก้ไขสินค้าสำเร็จ')
  } else {
    alert('แก้ไขสินค้าไม่สำเร็จ')
  }
}
</script>

<template>
  <div>
    <BaseHeader text="แก้ไขข้อมูลสินค้า" />
    <v-form ref="form">
      <v-text-field
        v-model="editProduct.productId"
        :rules="validationRules.productId"
        :disabled="true"
        label="รหัสสินค้า"
      />
      <v-text-field
        v-model="editProduct.productName"
        :rules="validationRules.productName"
        label="ชื่อสินค้า"
      />
      <v-text-field
        v-model="editProduct.productCost"
        :rules="validationRules.productCost"
        label="ราคาทุน"
      />
      <v-text-field
        v-model="editProduct.productPrice"
        :rules="validationRules.productPrice"
        label="ราคาสินค้า"
      />
      <v-text-field
        v-model="editProduct.productQuantity"
        :rules="validationRules.productQuantity"
        label="จำนวนสินค้า"
      />
      <v-btn
        type="submit"
        @click="editProductHandler"
        block
      >
        บันทึก
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped></style>
