<template>
  <form class="card auth-card" @submit.prevent="login">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="input-field">
        <input
          v-model="formData.email"
          :class="{ invalid: v$.email.$dirty && v$.email.$invalid }"
          id="email"
          type="text"
          class="validate"
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
          v-model="formData.password"
          :class="{ invalid: v$.password.$dirty && v$.password.$invalid }"
          id="password"
          type="password"
          class="validate"
          @blur="v$.password.$touch"
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
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useRouter, useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import message from "@/composables/message";
import messagesList from "@/composables/messagesList";
/* import { monitorAuth } from "@/firebase/auth"; */
import { useAuthStore } from "@/stores/authStore";
import { useErrorStore } from "@/stores/errorStore";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const errorStore = useErrorStore();

const formData = reactive({ email: "", password: "" });
const rules = {
  email: { required, email },
  password: { required, minLength: minLength(5) },
};
const v$ = useVuelidate(rules, formData);

onMounted(() => {
  if (messagesList[route.query.message]) {
    message(messagesList[route.query.message]);
  }
  /* monitorAuth(); */
});

function login() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  try {
    authStore.login(formData.email, formData.password).then(() => {
      router.push("/");
    });
  } catch (error) {
    errorStore.setError(error);
  }
}
</script>
