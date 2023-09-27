// This hook is different from the other "useFetchPosts" where we fetch a single user's posts.
// In this hook we fetch all posts including: the user's posts and the post of the users he is following.

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";

const useFetchAllPosts = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);

  useEffect(() => {
    if (id === null || id === undefined) return;
    const docRef = doc(db, "users", id);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      setUser({ ...doc.data() });

      const q = query(
        collection(db, "posts"),
        where("user", "in", [...doc.data().following, id]),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setIsLoading(false);
        setIsSuccess(true);
        setPosts([...posts]);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [id]);
  return { isLoading, isError, isSuccess, posts, errorMsg };
};

export default useFetchAllPosts;
