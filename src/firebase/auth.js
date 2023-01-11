import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { firebaseApp } from "./firebase";

export const auth = getAuth(firebaseApp);

export function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));
}

export function monitorAuth() {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log("Logged in!", user);
      return;
    }
    console.log("No user");
  });
}
