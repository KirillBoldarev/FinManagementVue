import {
  addDocToDatabase,
  getDocFromDatabase,
  updateDocInDatabase,
} from "@/firebase/database";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { useErrorStore } from "./errorStore";

export const useCashflowStore = defineStore("cashflow", () => {
  const errorStore = useErrorStore();
  const authStore = useAuthStore();

  async function createCashflow(payload) {
    try {
      const uid = await authStore.getUId();
      const cashflowId = Math.random().toString(36).substring(2, 9);
      addDocToDatabase(`users/${uid}/cashflows/${cashflowId}`, payload);
      return {
        id: cashflowId,
        name: payload.name,
        limit: payload.limit,
      };
    } catch (error) {
      errorStore.setError(error);
      throw error;
    }
  }
  async function fetchCashflows() {
    const uid = await authStore.getUId();
    const response = await getDocFromDatabase(`users/${uid}/cashflows`);
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
  }

  return {
    createCashflow,
    fetchCashflows,
    updateCashflows,
  };
});
