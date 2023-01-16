/* eslint-disable no-useless-catch */
import { defineStore } from "pinia";
import { useErrorStore } from "./errorStore";
import { ref } from "vue";
import { useInfoStore } from "./infoStore";
import { addDocToDatabase } from "@/firebase/database";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "@/firebase/firebase";

const auth = getAuth(firebaseApp);

export const useAuthStore = defineStore("auth", () => {
  const errorStore = useErrorStore();
  const infoStore = useInfoStore();
  const isAuth = ref({});

  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      isAuth.value = result;
    } catch (error) {
      errorStore.setError(error);
      throw error;
    }
  }

  async function registrateUser(email, password, name) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      addDocToDatabase("users/", getUId(), {
        bill: 1000,
        name,
      });
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
      infoStore.clearInfo();
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
