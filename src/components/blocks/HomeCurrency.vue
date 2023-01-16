<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="valute in valuteList" :key="valute">
              <td>{{ valute.Name }}</td>
              <td>{{ valute.Value }} руб.</td>
              <td>{{ date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import filterDate from "@/composables/filterDate";
import { computed } from "vue";

const props = defineProps({ currency: { type: Object, required: true } });
const date = computed(() => {
  return filterDate(props.currency.Date, "date");
});

const valuteList = [
  props.currency.Valute.USD,
  props.currency.Valute.EUR,
  props.currency.Valute.GBP,
];
</script>
