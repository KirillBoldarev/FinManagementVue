import { getDatabase, ref, set, child, get } from "firebase/database";
import { firebaseApp } from "./firebase";

const database = getDatabase(firebaseApp);
const databaseRef = ref(getDatabase(firebaseApp));

export async function addDocToDatabase(base, param, object) {
  try {
    set(ref(database, base + param), object);
  } catch (error) {
    console.log(error);
  }
}

export async function getDocFromDatabase(base, param) {
  const doc = await get(child(databaseRef, `${base}/${param}`));
  if (doc.exists()) {
    const result = doc.val();
    return result;
  } else {
    console.log("No data available");
  }
}
