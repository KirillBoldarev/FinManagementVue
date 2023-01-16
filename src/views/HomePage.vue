<template>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small">
      <i class="material-icons">refresh</i>
    </button>
  </div>
  <LoaderVue v-if="loading"></LoaderVue>
  <div v-else class="row">
    <HomeBill :rates="currency"></HomeBill>
    <HomeCurrency></HomeCurrency>
  </div>
</template>

<script setup>
import HomeBill from "@/components/blocks/HomeBill.vue";
import HomeCurrency from "@/components/blocks/HomeCurrency.vue";
import LoaderVue from "@/components/tools/LoaderVue.vue";
import { useInfoStore } from "@/stores/infoStore";
import { ref, onMounted } from "vue";
const infoStore = useInfoStore();
const loading = ref(true);
const currency = ref(null);

onMounted(async () => {
  currency.value = await infoStore.fetchCurrency();
  console.log("Данные из ЦБ", currency.value);
  loading.value = false;
});
</script>
