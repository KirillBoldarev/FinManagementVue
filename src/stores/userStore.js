/* eslint-disable no-useless-catch */
import { defineStore } from "pinia";
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

  async function login(email, password) {
    console.log("данные ушедшие для логина", email, password);
    const result = await signInWithEmailAndPassword(auth, email, password);
    isAuth.value = result.catch((er) => {
      throw er;
    });
  }

  async function registrateUser(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Успешно проведена регистрация");
    } catch (error) {
      throw error;
    }
  }

  function getUId() {
    const user = auth.currentUser;
    return user ? user.uid : null;
  }

  async function logout() {
    await signOut(auth).then((isAuth.value = {}));
  }

  return {
    isAuth,
    login,
    logout,
    registrateUser,
    getUId,
  };
});
