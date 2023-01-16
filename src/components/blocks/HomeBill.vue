<template>
  <div v-if="infoStore.info" class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <LoaderVue v-if="!infoStore.info.bill"></LoaderVue>
        <p
          v-else
          class="currency-line"
          v-for="valute in valuteList"
          :key="valute"
        >
          <span
            >{{ exchangeCurrency(valute.Value) }} {{ valute.CharCode }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInfoStore } from "@/stores/infoStore";
import LoaderVue from "../tools/LoaderVue.vue";
const infoStore = useInfoStore();
const props = defineProps({
  currency: {
    type: Object,
    required: true,
  },
});

const valuteList = [
  props.currency.Valute.USD,
  props.currency.Valute.EUR,
  props.currency.Valute.GBP,
];

function exchangeCurrency(currency) {
  const bill = infoStore.info.bill;
  return Math.floor((bill / currency) * 100) / 100;
}
</script>
