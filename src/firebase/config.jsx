import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCftaxupb8F0cgeA8cG-LebDbB3copWCHA",
  authDomain: "social-media-d89dd.firebaseapp.com",
  projectId: "social-media-d89dd",
  storageBucket: "social-media-d89dd.appspot.com",
  messagingSenderId: "909295195071",
  appId: "1:909295195071:web:557f78e0c7196d9085870a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Get a list of cities from your database
export async function getPosts(db) {
  const postsCol = collection(db, "posts");
  const postSnapshot = await getDocs(postsCol);
  const postList = postSnapshot.docs.map((doc) => doc.data());
  return postList;
}
