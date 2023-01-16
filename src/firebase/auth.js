import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthStore } from "@/stores/authStore";
import { firebaseApp } from "./firebase";
import { useInfoStore } from "@/stores/infoStore";

export const auth = getAuth(firebaseApp);

export function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));
}

export function monitorAuth() {
  const authStore = useAuthStore();
  const infoStore = useInfoStore();
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      /* console.log("Logged in!", user); */
      authStore.isAuth = user;
      infoStore.fetchUserInfo();
      return;
    }
    console.log("No user");
  });
}
