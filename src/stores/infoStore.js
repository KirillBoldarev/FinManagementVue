/* eslint-disable no-useless-catch */
import { defineStore } from "pinia";
import { useErrorStore } from "./errorStore";
import { useAuthStore } from "./authStore";
import { ref } from "vue";

import { getDocFromDatabase, updateDocInDatabase } from "@/firebase/database";

export const useInfoStore = defineStore("info", () => {
  const errorStore = useErrorStore();
  const authStore = useAuthStore();
  const info = ref({});

  async function fetchUserInfo() {
    try {
      const uid = authStore.getUId();
      const fetchedUser = await getDocFromDatabase(`users/${uid}/info`);
      console.log("fetchedUser", fetchedUser);
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
    return await result.json();
  }

  async function updateInfo(payload) {
    try {
      const uid = await authStore.getUId();
      console.log("payload ", payload);
      await updateDocInDatabase(`/users/${uid}/info`, payload);
    } catch (error) {
      errorStore.setError(error);
    }
  }

  return {
    info,
    fetchUserInfo,
    clearInfo,
    updateInfo,
    fetchCurrency,
  };
});
