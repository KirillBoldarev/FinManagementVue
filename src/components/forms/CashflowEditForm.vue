<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="updateCashflow">
        <div class="input-field">
          <select ref="select" v-model="currentCashflow">
            <option
              v-for="cashflow in props.cashflows"
              :key="cashflow.id"
              :value="cashflow.id"
            >
              {{ cashflow.name }}
            </option>
          </select>
          <label>Выберите статью</label>
        </div>

        <div class="input-field">
          <input
            v-model="formData.name"
            @blur="v$.name.$touch()"
            type="text"
            id="name"
            :class="{ invalid: v$.name.$dirty && v$.name.$invalid }"
          />
          <label for="name">Название</label>
          <span
            v-if="v$.name.$dirty && v$.name.$invalid"
            class="helper-text invalid"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            v-model="formData.limit"
            @blur="v$.limit.$touch()"
            id="limit"
            type="number"
            :class="{ invalid: v$.limit.$dirty && v$.limit.$invalid }"
          />
          <label for="limit">Лимит</label>
          <span
            v-if="v$.limit.$dirty && v$.limit.$invalid"
            class="helper-text invalid"
            >Минимальная величина {{ v$.limit.minValue.$params.min }}
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import { useCashflowStore } from "@/stores/cashflowStore";
import message from "@/composables/message";
const cashflowStore = useCashflowStore();
const select = ref(null);

const props = defineProps({
  cashflows: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update"]);

onMounted(() => {
  // eslint-disable-next-line no-undef
  M.updateTextFields();
  // eslint-disable-next-line no-undef
  select.value = M.FormSelect.init(select.value);
});

const formData = ref({
  name: props.cashflows[0].name,
  limit: props.cashflows[0].limit,
  id: props.cashflows[0].id,
});

const rules = {
  name: { required },
  limit: { required, minValue: minValue(1000) },
};

const v$ = useVuelidate(rules, formData);

const currentCashflow = ref(props.cashflows[0].id);

watch(currentCashflow, () => {
  const changed = props.cashflows.find(
    (item) => item.id === currentCashflow.value
  );
  formData.value = { ...changed };
});

async function updateCashflow() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  try {
    await cashflowStore.updateCashflows(formData.value);
    emit("update", formData.value);
    message(`Изменения успешно внесены`);
  } catch (error) {}
}

onBeforeUnmount(() => {
  if (select.value && select.value.destoy) {
    select.value.destoy();
  }
});
</script>
