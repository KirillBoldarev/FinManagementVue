<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createCashflow">
        <div class="input-field">
          <input
            v-model="formData.name"
            @blur="v$.$touch()"
            id="name"
            type="text"
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
            v-model.number="formData.limit"
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
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { useCashflowStore } from "@/stores/cashflowStore";
import message from "@/composables/message";

const emit = defineEmits(["create"]);

const cashflowStore = useCashflowStore();

const formData = reactive({
  name: "",
  limit: null,
});

const rules = {
  name: { required },
  limit: { required, minValue: minValue(1000) },
};

const v$ = useVuelidate(rules, formData);

onMounted(() => {
  // eslint-disable-next-line no-undef
  M.updateTextFields();
});

async function createCashflow() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  try {
    const cashflow = await cashflowStore.createCashflow(formData);
    message(`Статья затрат "${formData.name}"" создана `);
    resetForm();
    emit("create", cashflow);
  } catch (error) {
    console.log(error);
  }
}

function resetForm() {
  formData.name = "";
  formData.limit = null;
  v$.value.$reset();
}
</script>
