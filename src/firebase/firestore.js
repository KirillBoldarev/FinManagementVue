import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { firebaseApp } from "./firebase";

const firestore = getFirestore(firebaseApp);

export async function addItem(collectionName, item) {
  try {
    const document = await addDoc(collection(firestore, collectionName), item);
    console.log("Объект был успешно добавлен в базу с ID:", document.id);
    return document;
  } catch (error) {
    console.log("Ошибка при добавлении документа", error);
    throw error;
  }
}

export async function getItem(collection) {
  const data = await getDocs(collection(firestore, collection));
  return data;
}
