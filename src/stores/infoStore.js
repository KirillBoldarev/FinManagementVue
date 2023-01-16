/* eslint-disable no-useless-catch */
import { defineStore } from "pinia";
import { useErrorStore } from "./errorStore";
import { useAuthStore } from "./authStore";
import { ref } from "vue";

import { getDocFromDatabase } from "@/firebase/database";

export const useInfoStore = defineStore("info", () => {
  const errorStore = useErrorStore();
  const authStore = useAuthStore();
  const info = ref({});

  async function fetchUserInfo() {
    try {
      const uid = authStore.getUId();
      const fetchedUser = await getDocFromDatabase("users", uid);
      info.value = fetchedUser;
    } catch (error) {
      errorStore.setError(error);
    }
  }

  function clearInfo() {
    info.value = {};
  }

  async function fetchCurrency() {
    const result = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

    /*     const key = process.env.VUE_APP_FIXER;

    const myHeaders = new Headers();
    myHeaders.append("apikey", key);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    const res = await fetch(
      "https://api.apilayer.com/fixer/convert?to=RUB&from=USD&amount=1",
      requestOptions
    ); */
    return await result.json();
  }

  return {
    info,
    fetchUserInfo,
    clearInfo,
    fetchCurrency,
  };
});
