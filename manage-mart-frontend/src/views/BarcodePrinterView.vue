<script setup>
import { ref, onBeforeMount } from 'vue'
import { getProducts } from '@/utils/services/productService'
// import { VBarcode } from 'vbarcode'

const products = ref([])

onBeforeMount(async () => {
  products.value = await getProducts().then(response => response.data)
})
</script>

<template>
  <div class="grid grid-cols-7 max-w-[840px]">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="max-w-[120px] border-r-[1px]"
    >
      <div
        class="bg-yellow px-2 pt-1 h-[52px] flex items-center justify-center"
      >
        <p class="font-medium font-chakra text-center text-balance line-clamp-2">
          {{ product.productName }}
        </p>
      </div>
      <div>
        <p class="text-center font-bold text-3xl font-chakra">
          {{ Math.trunc(product.productPrice) }}
          <span class="font-normal font-chakra text-base">บาท</span>
        </p>
      </div>
      <!-- <v-barcode
        :value="product.productBarcode"
        :height="35"
        :display-value="false"
      ></v-barcode> -->
    </div>
  </div>
</template>

<style scoped></style>
