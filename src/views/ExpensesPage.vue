<template>
  <div class="page-title">
    <h3>Затраты</h3>
    {{ expenses }}
  </div>
  <section>
    <div class="row">
      <ExpenseCreateForm @create="addNewExpense"></ExpenseCreateForm>

      <ExpenseEditForm></ExpenseEditForm>
    </div>
  </section>
</template>

<script setup>
import ExpenseCreateForm from "@/components/forms/ExpenseCreateForm.vue";
import ExpenseEditForm from "@/components/forms/ExpenseEditForm.vue";
import { ref } from "vue";

const expenses = ref([]);

function addNewExpense(item) {
  expenses.value.push(item);
}
</script>
