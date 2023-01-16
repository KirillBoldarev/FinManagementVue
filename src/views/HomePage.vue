<template>
  <div v-if="infoStore.info" class="page-title">
    <h3>Счет: {{ infoStore.info.bill }} руб.</h3>

    <button @click="refresh" class="btn waves-effect waves-light btn-small">
      <i class="material-icons">refresh</i>
    </button>
  </div>
  <LoaderVue v-if="loading"></LoaderVue>
  <div v-else class="row">
    <HomeBill :currency="currency"></HomeBill>
    <HomeCurrency :currency="currency"></HomeCurrency>
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

async function refresh() {
  loading.value = true;
  currency.value = await infoStore.fetchCurrency();
  loading.value = false;
}

onMounted(async () => {
  refresh();
});
</script>
