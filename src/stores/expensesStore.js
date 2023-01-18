import { addDocToDatabase } from "@/firebase/database";
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

  return {
    expenses,
    createExpense,
  };
});
