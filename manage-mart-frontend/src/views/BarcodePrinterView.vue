<script setup>
import { ref, onBeforeMount } from 'vue'
import { getProducts } from '@/utils/services/productService'
import { VBarcode } from 'vbarcode'

const products = ref([])

onBeforeMount(async () => {
  products.value = await getProducts().then(response => response.data)
})
</script>

<template>
  <div class="grid grid-cols-2 max-w-[793px]">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="max-w-[266px]"
    >
      <div class="bg-yellow px-2 pt-1">
        <p class="font-medium align-middle">{{ product.productName }}</p>
        <p class="text-right font-bold text-3xl align-middle">
          {{ product.productPrice }}
          <span class="font-normal text-base">บาท</span>
        </p>
      </div>
      <v-barcode
        :value="product.productBarcode"
        :height="35"
        :display-value="false"
      ></v-barcode>
    </div>
  </div>
</template>

<style scoped>

</style>
