<template>
  <form class="card auth-card" @submit.prevent="registration">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          v-model="formData.email"
          :class="{ invalid: v$.email.$dirty && v$.email.$invalid }"
          id="email"
          type="text"
          @blur="v$.email.$touch()"
        />
        <label for="email">Email</label>
        <small
          v-if="v$.email.$dirty && v$.email.email.$invalid"
          class="helper-text invalid"
          >Некорректный формат</small
        >
        <small
          v-if="v$.email.$dirty && v$.email.required.$invalid"
          class="helper-text invalid"
          >Поле не должно быть пустым</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          :class="{ invalid: v$.password.$dirty && v$.password.$invalid }"
          v-model="formData.password"
          @blur="v$.password.$touch()"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.minLength.$invalid"
          >Введите не менее
          {{ v$.password.minLength.$params.min }} символов</small
        >
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          >Поле не должно быть пустым</small
        >
      </div>
      <div class="input-field">
        <input
          v-model="formData.name"
          @blur="v$.name.$touch()"
          id="name"
          type="text"
          class="validate"
          :class="{ invalid: v$.name.$dirty && v$.name.$invalid }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.required.$invalid"
          >Поле не должно быть пустым</small
        >
      </div>
      <p>
        <label>
          <input v-model="formData.approval" type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useErrorStore } from "@/stores/errorStore";

const authStore = useAuthStore();
const errorStore = useErrorStore();
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
  name: "",
  approval: false,
});
const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  name: { required },
  approval: { checked: (v) => v },
};
const v$ = useVuelidate(rules, formData);

async function registration() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  try {
    await authStore.registrateUser(
      formData.email,
      formData.password,
      formData.name
    );
    await authStore.login(formData.email, formData.password);
    router.push("/");
  } catch (error) {
    errorStore.setError(error);
  }
}
</script>
