<template>
  <div class="page-title">
    <h3>Затраты</h3>
  </div>
  <section>
    <LoaderVue v-if="loading"></LoaderVue>
    <div class="row" v-else>
      <ExpenseCreateForm @create="addNewExpense"></ExpenseCreateForm>
      <ExpenseEditForm
        v-if="expenses.length"
        :expenses="expenses"
        :key="expenses.length + counter"
        @update="updateExpenses"
      ></ExpenseEditForm>
    </div>
  </section>
</template>

<script setup>
import ExpenseCreateForm from "@/components/forms/ExpenseCreateForm.vue";
import ExpenseEditForm from "@/components/forms/ExpenseEditForm.vue";
import LoaderVue from "@/components/tools/LoaderVue.vue";
import { useExpensesStore } from "@/stores/expensesStore";
import { ref, onMounted } from "vue";
const counter = ref(0);

const expensesStore = useExpensesStore();
const expenses = ref([]);
const loading = ref(true);

onMounted(async () => {
  fetchExpenses();
});

async function fetchExpenses() {
  loading.value = true;
  expenses.value = await expensesStore.fetchExpenses();
  loading.value = false;
}
function addNewExpense(item) {
  expenses.value.push(item);
}
function updateExpenses(payload) {
  const idx = expenses.value.findIndex((item) => item.id === payload.id);
  expenses.value[idx] = payload;
  counter.value++;
}
</script>
