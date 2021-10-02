import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADhEJAg1DPGx3JfBU4SPURkWsHLVhLOgc",
  authDomain: "orderscf-60400.firebaseapp.com",
  projectId: "orderscf-60400",
  storageBucket: "orderscf-60400.appspot.com",
  messagingSenderId: "942547821211",
  appId: "1:942547821211:web:143d0ca0aed3ebd0d2dc3e",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export const uploadOrder = async (orderId, order) => {
  await setDoc(doc(db, "orders", `${orderId}`), {
    ...order,
  });
};

export const getAllOrdersFirebase = async (userId) => {
  const array = [];
  const q = query(collection(db, "orders"), where("userId", "==", `${userId}`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() });
  });
  return array;
};
