<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="updateExpenses">
        <div class="input-field">
          <select ref="select" v-model="currentExpense">
            <option
              v-for="expense in props.expenses"
              :key="expense.id"
              :value="expense.id"
            >
              {{ expense.name }}
            </option>
          </select>
          <label>Выберите статью затрат</label>
        </div>

        <div class="input-field">
          <input
            v-model="formData.name"
            @blur="v$.$touch()"
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
            @blur="v$.$touch()"
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
import { useExpensesStore } from "@/stores/expensesStore";
import message from "@/composables/message";
const expensesStore = useExpensesStore();
const select = ref(null);

const props = defineProps({
  expenses: {
    type: Array,
    required: true,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [],
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
  name: props.expenses[0].name,
  limit: props.expenses[0].limit,
  id: props.expenses[0].id,
});

const rules = {
  name: { required },
  limit: { required, minValue: minValue(1000) },
};

const v$ = useVuelidate(rules, formData);

const currentExpense = ref(props.expenses[0].id);

watch(currentExpense, () => {
  const changed = props.expenses.find(
    (item) => item.id === currentExpense.value
  );
  formData.value = { ...changed };
});

async function updateExpenses() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  try {
    await expensesStore.updateExpenses(formData.value);
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
