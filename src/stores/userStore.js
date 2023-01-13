/* eslint-disable no-useless-catch */
import { defineStore } from "pinia";
import { useErrorStore } from "./errorStore";
import { ref } from "vue";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "@/firebase/firebase";

const auth = getAuth(firebaseApp);

export const useUserStore = defineStore("user", () => {
  const isAuth = ref({});
  const errorStore = useErrorStore();

  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      isAuth.value = result;
    } catch (error) {
      errorStore.setError(error);
      throw error;
    }
  }

  async function registrateUser(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      errorStore.setError(error);
      throw error;
    }
  }

  function getUId() {
    const user = auth.currentUser;
    return user ? user.uid : null;
  }

  async function logout() {
    try {
      await signOut(auth);
      isAuth.value = {};
    } catch (error) {
      errorStore.setError(error);
    }
  }

  return {
    isAuth,
    login,
    logout,
    registrateUser,
    getUId,
  };
});
