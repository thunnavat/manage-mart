<script setup>
defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>
 
<template>
    <div>
        <h1>{{ text }}</h1>
    </div>
</template>
 
<style scoped>

</style>