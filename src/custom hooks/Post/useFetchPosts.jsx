import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";

const useFetchPosts = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("user", "==", userId),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setIsLoading(false);
      setIsSuccess(true);
      setPosts([...posts]);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);
  return { isLoading, isError, isSuccess, posts, errorMsg };
};

export default useFetchPosts;
