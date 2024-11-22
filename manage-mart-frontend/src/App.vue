<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template class="printableArea">
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.png"
      width="220"
    />
    <div>
      <nav>
        <RouterLink to="/">แคชเชียร์</RouterLink> | 
        <RouterLink to="/products">รายการสินค้า</RouterLink> 
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
.printableArea {
    width: 8.5cm !important; 
    height:100% !important;
}
 
@page {
    size: 8cm auto !important;
    width: 8cm !important;
    height: 100% !important; 
    margin: 0 !important;
    margin-left: 5px !important;
}
</style>
