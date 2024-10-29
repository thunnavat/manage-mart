<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.png"
      width="220"
    />
    <div>
      <nav>
        <RouterLink to="/products">รายการสินค้า</RouterLink> |
        <RouterLink to="/barcode-printer">เครื่องพิมพ์บาร์โค้ด</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
