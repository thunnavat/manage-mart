<script setup>
import { ref } from 'vue'
import router from '@/router'
import BaseHeader from '@/components/BaseHeader.vue'
import { updateProduct } from '@/utils/services/productService'
import useBarcodeDetector from '@programic/vue-barcode-detector'
import { thaiToEngMap } from '@/utils/variables/constantVariable'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  productCategories: {
    type: Array,
    required: true,
  },
})

const barcodeDetector = useBarcodeDetector()

const successDialog = ref(false)

const editProduct = ref({
  productId: props.product.productId,
  productBarcode: props.product.productBarcode,
  productName: props.product.productName,
  productCost: props.product.productCost,
  productPrice: props.product.productPrice,
  productQuantity: props.product.productQuantity,
  productExpirationDate: props.product.productExpirationDate,
  productCategoryId: props.product.productCategoryId,
})

const validationRules = {
  productBarcode: [v => !!v || 'บาร์โค้ดสินค้าไม่สามารถเว้นว่างได้'],
  productName: [v => !!v || 'ชื่อสินค้าไม่สามารถเว้นว่างได้'],
  productCost: [v => !!v || 'ราคาทุนไม่สามารถเว้นว่างได้'],
  productPrice: [v => !!v || 'ราคาสินค้าไม่สามารถเว้นว่างได้'],
  productQuantity: [v => !!v || 'จำนวนสินค้าไม่สามารถเว้นว่างได้'],
  productCategoryId: [v => !!v || 'หมวดหมู่สินค้าไม่สามารถเว้นว่างได้'],
}

barcodeDetector.listen((barcodeData) => {
  if ([...barcodeData.value].some(char => char in thaiToEngMap)) {
    editProduct.value.productBarcode = [...barcodeData.value].map((char) => {
      return thaiToEngMap[char] || char
    }).join('')
  } else {
    editProduct.value.productBarcode = barcodeData.value
  }
})

const editProductHandler = async () => {
  const response = await updateProduct(
    editProduct.value.productId,
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
        label="บาร์โค้ดสินค้า"
        required
      />
      <v-text-field
        v-model="editProduct.productName"
        :rules="validationRules.productName"
        label="ชื่อสินค้า"
        required
      />
      <v-text-field
        v-model="editProduct.productCost"
        :rules="validationRules.productCost"
        label="ราคาทุน"
        required
      />
      <v-text-field
        v-model="editProduct.productPrice"
        :rules="validationRules.productPrice"
        label="ราคาขาย"
        required
      />
      <v-text-field
        v-model="editProduct.productQuantity"
        :rules="validationRules.productQuantity"
        label="จำนวนสินค้า"
        required
      />
      <v-text-field
        v-model="editProduct.productExpirationDate"
        label="วันหมดอายุสินค้า"
        type="date"
        required
      />
      <v-select
        v-model="editProduct.productCategoryId"
        :items="props.productCategories.map(category => {
          return {
            title: category.productCategoryName,
            value: category.productCategoryId,
          }
        })"
        :rules="validationRules.productCategoryId"
        label="หมวดหมู่สินค้า"
        required
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
