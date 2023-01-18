<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form>
        <div class="input-field">
          <select>
            <option>Category</option>
          </select>
          <label>Выберите статью затрат</label>
        </div>

        <div class="input-field">
          <input
            v-model="formData.name"
            type="text"
            id="name"
            :class="{ invalid: v$.name.$dirty && v$.name.$invalid }"
          />
          <label for="name">Название</label>
          <span
            v-if="v$.name.$dirty && v$.name.$invalid"
            class="helper-text invalid"
            >TITLE</span
          >
        </div>

        <div class="input-field">
          <input v-model="formData.limit" id="limit" type="number" />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">LIMIT</span>
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
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const formData = reactive({
  name: "",
  limit: 0,
});

const rules = {
  name: { required },
  limit: { required },
};

const v$ = useVuelidate(rules, formData);
</script>
