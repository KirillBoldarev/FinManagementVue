<template>
  <div class="page-title">
    <h3>Статьи движения денежных средств</h3>
  </div>
  <section>
    <LoaderVue v-if="loading"></LoaderVue>
    <div class="row" v-else>
      <CashflowCreateForm @create="addNewCashflow"></CashflowCreateForm>
      <CashflowEditForm
        v-if="cashflows.length"
        :cashflows="cashflows"
        :key="cashflows.length + counter"
        @update="updateCashflows"
      ></CashflowEditForm>
    </div>
  </section>
</template>

<script setup>
import CashflowCreateForm from "@/components/forms/CashflowCreateForm.vue";
import CashflowEditForm from "@/components/forms/CashflowEditForm.vue";
import LoaderVue from "@/components/tools/LoaderVue.vue";
import { useCashflowStore } from "@/stores/cashflowStore";
import { ref, onMounted } from "vue";
const counter = ref(0);

const cashflowStore = useCashflowStore();
const cashflows = ref([]);
const loading = ref(true);

onMounted(async () => {
  fetchCashflows();
});

async function fetchCashflows() {
  loading.value = true;
  cashflows.value = await cashflowStore.fetchCashflows();
  loading.value = false;
}
function addNewCashflow(item) {
  cashflows.value.push(item);
}
function updateCashflows(payload) {
  const idx = cashflows.value.findIndex((item) => item.id === payload.id);
  cashflows.value[idx] = payload;
  counter.value++;
}
</script>
