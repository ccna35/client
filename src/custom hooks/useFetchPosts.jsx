import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

// const firebaseConfig = {
//   apiKey: "AIzaSyCftaxupb8F0cgeA8cG-LebDbB3copWCHA",
//   authDomain: "social-media-d89dd.firebaseapp.com",
//   projectId: "social-media-d89dd",
//   storageBucket: "social-media-d89dd.appspot.com",
//   messagingSenderId: "909295195071",
//   appId: "1:909295195071:web:557f78e0c7196d9085870a",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

// Get a list of cities from your database
export default async function useFetchPosts(userId) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsCol = collection(db, "posts");
    console.log(userId);
    const q = query(postsCol, where("user", "==", userId));
    getDocs(q)
      .then((data) => data.docs.map((doc) => doc.data()))
      .then((data) => {
        setPosts([...data]);
      });
  }, [userId]);

  return posts;
}
