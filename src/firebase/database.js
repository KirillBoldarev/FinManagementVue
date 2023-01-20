import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { firebaseApp } from "./firebase";

const database = getDatabase(firebaseApp);
const databaseRef = ref(getDatabase(firebaseApp));

export async function addDocToDatabase(base, object) {
  try {
    set(ref(database, base), object);
  } catch (error) {
    console.log(error);
  }
}

export async function getDocFromDatabase(path) {
  const doc = await get(child(databaseRef, `${path}`));
  if (doc.exists()) {
    const result = doc.val();
    return result;
  } else {
    console.log("No data available");
  }
}

export async function updateDocInDatabase(path, payload) {
  const updates = {};
  updates[path] = payload;
  return update(ref(database), updates);
}
