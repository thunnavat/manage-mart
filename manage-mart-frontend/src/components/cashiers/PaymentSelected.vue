<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['selectPaymentMethod'])
const props = defineProps({
  paymentMethods: {
    type: Array,
    required: true,
  },
    defaultPaymentMethod: {
        type: Number,
        required: true,
    },
})

const selectedPaymentMethod = ref(props.defaultPaymentMethod)

onMounted(() => {
    emit('selectPaymentMethod', selectedPaymentMethod.value)
})
</script>

<template>
  <div>
    <v-item-group
      mandatory
      v-model="selectedPaymentMethod"
      @update:modelValue="emit('selectPaymentMethod', selectedPaymentMethod)"
    >
      <v-container>
        <v-row>
          <v-col
            v-for="(method, index) in paymentMethods"
            :key="index"
            cols="12"
            md="4"
          >
            <v-item
              v-slot="{ isSelected, toggle }"
              :value="method.paymentMethodId"
            >
              <v-card
                :color="isSelected ? 'primary' : ''"
                class="d-flex align-center"
                height="120"
                dark
                @click="toggle"
              >
                <v-scroll-y-transition>
                  <div class="font-bold text-3xl flex-grow-1 text-center">
                    {{ method.paymentMethodName }}
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<style></style>
