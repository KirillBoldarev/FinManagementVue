<template>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>
  <LoaderVue v-if="loading"></LoaderVue>
  <p v-else-if="!cashflows.length">
    Заполните <router-link to="/expenses"> статью расходов</router-link>.
  </p>

  <form v-else class="form" @submit.prevent="createRecord">
    <div class="input-field">
      <select ref="select" v-model="formData.chosenCashflow">
        <option
          v-for="cashflow in cashflows"
          :key="cashflow.id"
          :value="cashflow.id"
        >
          {{ cashflow.name }}
        </option>
      </select>
      <label>Выберите категорию</label>
    </div>

    <p>
      <label>
        <input
          class="with-gap"
          name="type"
          type="radio"
          value="income"
          v-model="formData.type"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
          class="with-gap"
          name="type"
          type="radio"
          value="outcome"
          v-model="formData.type"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
        id="amount"
        type="number"
        v-model="formData.sum"
        :class="{ invalid: v$.sum.$dirty && v$.sum.$invalid }"
        @blur="v$.sum.$touch()"
      />
      <label for="amount">Сумма</label>
      <span class="helper-text invalid" v-if="v$.sum.$dirty && v$.sum.$invalid"
        >Введите сумму не менее {{ v$.sum.minValue.$params.min }}
      </span>
    </div>

    <div class="input-field">
      <input
        id="description"
        type="text"
        v-model="formData.description"
        :class="{ invalid: v$.description.$dirty && v$.description.$invalid }"
        @blur="v$.description.$touch()"
      />
      <label for="description">Описание</label>
      <span
        class="helper-text invalid"
        v-if="v$.description.$dirty && v$.description.$invalid"
        >Введите описание</span
      >
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script setup>
import { useCashflowStore } from "@/stores/cashflowStore";
import { useInfoStore } from "@/stores/infoStore";
import { useRecordStore } from "@/stores/recordStore";
import { ref, onMounted, onBeforeUnmount, reactive, computed } from "vue";
import { minValue, required } from "@vuelidate/validators";
import LoaderVue from "@/components/tools/LoaderVue.vue";
import useVuelidate from "@vuelidate/core";
import message from "@/composables/message";
const select = ref(null);
const loading = ref(true);
const cashflowStore = useCashflowStore();
const infoStore = useInfoStore();
const recordStore = useRecordStore();
const cashflows = ref([]);

const formData = reactive({
  chosenCashflow: null,
  type: "outcome",
  sum: null,
  description: "",
});
const rules = {
  type: { required },
  sum: { required, minValue: minValue(100) },
  description: { required },
};
const v$ = useVuelidate(rules, formData);

onMounted(async () => {
  // eslint-disable-next-line no-undef
  M.updateTextFields();

  cashflows.value = await cashflowStore.fetchCashflows();
  loading.value = false;
  setTimeout(() => {
    // eslint-disable-next-line no-undef
    select.value = M.FormSelect.init(select.value);
  }, 0);

  if (cashflows.value.length) {
    formData.chosenCashflow = cashflows.value[0].id;
  }
});

const canCreaterecord = computed(() => {
  if (formData.type === "income") {
    return true;
  }
  if (formData.type === "outcome" && infoStore.info.bill >= formData.sum) {
    return true;
  }
  return false;
});

async function createRecord() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  if (canCreaterecord.value) {
    try {
      console.log("все ок");
      await recordStore.createRecord({
        ...formData,
        date: new Date().toJSON(),
      });
      const updatedBill =
        formData.type === "income"
          ? infoStore.info.bill + formData.sum
          : infoStore.info.bill - formData.sum;
      await infoStore.updateInfo({
        name: infoStore.info.name,
        bill: updatedBill,
      });
      message("Запись успешно создана");
      v$.value.$reset();
      formData.sum = null;
      formData.description = "";
      await infoStore.fetchUserInfo();
    } catch (error) {
      console.log(error);
    }
  } else
    message(
      `Недостаточно средств дял списания - ${
        formData.sum - infoStore.info.bill
      } рублей`
    );
}

onBeforeUnmount(() => {
  if (select.value && select.value.destoy) {
    select.value.destoy();
  }
});
</script>
