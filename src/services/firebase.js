import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../shared/config";

const updateFireStoreData = async (path, data, id) => {
  return await updateDoc(doc(db, path, id), data);
};

const addFirestoreData = async (path, data) => {
  return await addDoc(collection(db, path), data);
};

const deleteFirestoreData = async (path, id) => {
  return await deleteDoc(doc(db, path, id));
};

const getFirestoreData = async (path, sort = 'created') => {
  const querySnapshot = await getDocs(query(collection(db, path), orderBy(sort, 'asc')));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

export { db, getFirestoreData, addFirestoreData, updateFireStoreData, deleteFirestoreData };
