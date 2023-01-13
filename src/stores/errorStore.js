import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const error = ref(null);

  function setError(currentError) {
    error.value = currentError;
  }

  function clearError() {
    error.value = null;
  }

  return {
    error,
    setError,
    clearError,
  };
});
