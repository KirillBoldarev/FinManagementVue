import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { firebaseApp } from "./firebase";

const firestore = getFirestore(firebaseApp);

export async function addItem(collectionName, item) {
  try {
    const document = await addDoc(collection(firestore, collectionName), item);
    return document;
  } catch (error) {
    console.log("Ошибка при добавлении документа", error);
    throw error;
  }
}

export async function getCollection(collectionName) {
  try {
    const formattedData = [];
    const data = await getDocs(collection(firestore, collectionName));
    data.forEach((document) => {
      formattedData.push({ id: document.id, ...document.data() });
    });
    return formattedData;
  } catch (error) {
    console.log(error);
  }
}
