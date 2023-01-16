<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line">
          <span>{{ billInForeign }} $</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInfoStore } from "@/stores/infoStore";
import { computed } from "vue";
const infoStore = useInfoStore();
const props = defineProps({
  rates: {
    type: Object,
    required: true,
  },
});

const billInForeign = computed(() => {
  const valueUSD = props.rates.Valute.USD.Value;
  const num = infoStore.info.bill / valueUSD;
  return Math.floor(num * 100) / 100;
});
</script>
