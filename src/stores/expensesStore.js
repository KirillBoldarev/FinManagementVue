import {
  addDocToDatabase,
  getDocFromDatabase,
  updateDocInDatabase,
} from "@/firebase/database";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";
import { useErrorStore } from "./errorStore";

export const useExpensesStore = defineStore("expenses", () => {
  const errorStore = useErrorStore();
  const authStore = useAuthStore();

  const expenses = ref([]);

  async function createExpense(payload) {
    try {
      const uid = await authStore.getUId();
      const expenseId = Math.random().toString(36).substring(2, 9);
      addDocToDatabase(`users/${uid}/expenses/${expenseId}`, payload);
      return {
        id: expenseId,
        name: payload.name,
        limit: payload.limit,
      };
    } catch (error) {
      errorStore.setError(error);
      throw error;
    }
  }
  async function fetchExpenses() {
    const uid = await authStore.getUId();
    const response = await getDocFromDatabase("users", `${uid}/expenses`);
    if (response) {
      return Object.keys(response).map((key) => ({
        ...response[key],
        id: key,
      }));
    }
    return [];
  }
  async function updateExpenses(payload) {
    const uid = await authStore.getUId();
    await updateDocInDatabase(`/users/${uid}/expenses/${payload.id}`, {
      name: payload.name,
      limit: payload.limit,
    });
  }

  return {
    expenses,
    createExpense,
    fetchExpenses,
    updateExpenses,
  };
});
