<script setup>
import { ref } from 'vue'
import router from '@/router'
import { addProduct } from '@/utils/services/productService.js'
import BaseHeader from '@/components/BaseHeader.vue'
import useBarcodeDetector from '@programic/vue-barcode-detector'
import { thaiToEngMap } from '@/utils/variables/constantVariable'
import { cleanBarcodeInput, isProbablyThai } from '@/utils/functions/globalFunction'

const props = defineProps({
  productCategories: {
    type: Array,
    required: true,
  },
})

const barcodeDetector = useBarcodeDetector()

const successDialog = ref(false)

const newProduct = ref({
  productBarcode: '',
  productName: '',
  productCost: '',
  productPrice: '',
  productQuantity: '',
  productExpirationDate: null,
  productCategoryId: '',
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
  if (barcodeData.value) {
    barcodeData.value = cleanBarcodeInput(barcodeData.value)
  }
  if ([...barcodeData.value].some(char => char in thaiToEngMap) && isProbablyThai(barcodeData.value)) {
    newProduct.value.productBarcode = [...barcodeData.value].map((char) => {
      return thaiToEngMap[char] || char
    }).join('')
  } else {
    newProduct.value.productBarcode = barcodeData.value
  }
})

const resetForm = () => {
  this.$refs.form.reset()
  this.$refs.form.resetValidation()
  newProduct.value = {
    productBarcode: '',
    productName: '',
    productCost: '',
    productPrice: '',
    productQuantity: '',
    productExpirationDate: null,
    productCategoryId: '',
  }
}

const addProductHandler = async () => {
  const { productBarcode, productName, productCost, productPrice, productQuantity, productExpirationDate, productCategoryId } =
    newProduct.value
  const product = {
    productBarcode,
    productName,
    productCost,
    productPrice,
    productQuantity,
    productExpirationDate,
    productCategoryId,
  }
  const response = await addProduct(product)
  if (response.status === 201) {
    successDialog.value = true
    resetForm()
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
        v-model="newProduct.productBarcode"
        :rules="validationRules.productBarcode"
        label="บาร์โค้ดสินค้า"
        required
      />
      <v-text-field
        v-model="newProduct.productName"
        :rules="validationRules.productName"
        label="ชื่อสินค้า"
        required
      />
      <v-text-field
        v-model="newProduct.productCost"
        :rules="validationRules.productCost"
        label="ราคาทุน"
        required
      />
      <v-text-field
        v-model="newProduct.productPrice"
        :rules="validationRules.productPrice"
        label="ราคาขาย"
        required
      />
      <v-text-field
        v-model="newProduct.productQuantity"
        :rules="validationRules.productQuantity"
        label="จำนวนสินค้า"
        required
      />
      <v-text-field
        v-model="newProduct.productExpirationDate"
        label="วันหมดอายุสินค้า"
        type="date"
        required
      />
      <v-select
        v-model="newProduct.productCategoryId"
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
        @click="addProductHandler"
        block
      >
        เพิ่มสินค้า
      </v-btn>
    </v-form>
  </div>
  <v-dialog
    v-model="successDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title>เพิ่มสินค้าสำเร็จ</v-card-title>
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
