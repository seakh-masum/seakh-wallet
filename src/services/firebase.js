import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../shared/config/config";

const updateFireStoreData = async (path, data, id) => {
  // return firestore().collection(path).doc(id).update(data);
  return await updateDoc(doc(db, path, id), data);
};

const addFirestoreData = async (path, data) => {
  // return firestore().collection(path).add(data);
  return await addDoc(collection(db, path), data);
};

const deleteFirestoreData = async(path, id) => {
  // return firestore().collection(path).doc(id).delete();
  return await deleteDoc(doc(db, path, id));
};

const app = initializeApp(FIREBASE_CONFIG);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, addFirestoreData, updateFireStoreData, deleteFirestoreData };
