<script setup>
import { ref } from 'vue'
import router from '@/router'
import BaseHeader from '@/components/BaseHeader.vue'
import { updateProduct } from '@/utils/services/productService'
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const successDialog = ref(false)

const editProduct = ref({
  productBarcode: props.product.productBarcode,
  productName: props.product.productName,
  productCost: props.product.productCost,
  productPrice: props.product.productPrice,
  productQuantity: props.product.productQuantity,
})

const validationRules = {
  productBarcode: [v => !!v || 'บาร์โค้ดสินค้าไม่สามารถเว้นว่างได้'],
  productName: [v => !!v || 'ชื่อสินค้าไม่สามารถเว้นว่างได้'],
  productCost: [v => !!v || 'ราคาทุนไม่สามารถเว้นว่างได้'],
  productPrice: [v => !!v || 'ราคาสินค้าไม่สามารถเว้นว่างได้'],
  productQuantity: [v => !!v || 'จำนวนสินค้าไม่สามารถเว้นว่างได้'],
}

const barcode = ref('')
const interval = ref()
document.addEventListener('keydown', event => {
  if (interval.value) {
    clearInterval(interval.value)
  }
  if (event.code === 'Enter') {
    console.log(barcode.value)
    if (barcode.value && barcode.value === props.product.productBarcode) {
      editProduct.value.productQuantity += 1
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

const editProductHandler = async () => {
  const response = await updateProduct(
    editProduct.value.productBarcode,
    editProduct.value,
  )
  if (response.status === 200) {
    successDialog.value = true
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
        v-model="editProduct.productBarcode"
        :rules="validationRules.productBarcode"
        :disabled="true"
        label="บาร์โค้ดสินค้า"
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
        @click="editProductHandler"
        block
      >
        บันทึก
      </v-btn>
    </v-form>
  </div>
  <v-dialog
    v-model="successDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title>แก้ไขสินค้าสำเร็จ</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="successDialog = false; router.go()"
        >
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
