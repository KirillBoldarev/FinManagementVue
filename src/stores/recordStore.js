import {
  addDocToDatabase,
  /*   getDocFromDatabase,
  updateDocInDatabase, */
} from "@/firebase/database";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { useErrorStore } from "./errorStore";

export const useRecordStore = defineStore("record", () => {
  const errorStore = useErrorStore();
  const authStore = useAuthStore();

  async function createRecord(payload) {
    try {
      const uid = await authStore.getUId();
      const recordID = Math.random().toString(36).substring(2, 9);
      addDocToDatabase(`users/${uid}/records/${recordID}`, payload);
      return {
        id: recordID,
        ...payload,
      };
    } catch (error) {
      errorStore.setError(error);
      throw error;
    }
  }

  /*   async function fetchCashflows() {
    const uid = await authStore.getUId();
    const response = await getDocFromDatabase("users", `${uid}/cashflows`);
    if (response) {
      return Object.keys(response).map((key) => ({
        ...response[key],
        id: key,
      }));
    }
    return [];
  }

  async function updateCashflows(payload) {
    const uid = await authStore.getUId();
    await updateDocInDatabase(`/users/${uid}/cashflows/${payload.id}`, {
      name: payload.name,
      limit: payload.limit,
    });
  } */

  return {
    createRecord,
    /*     fetchCashflows,
    updateCashflows, */
  };
});
