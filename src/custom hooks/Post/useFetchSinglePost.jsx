import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const useFetchSinglePost = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [post, setPost] = useState({});

  useEffect(() => {
    const docRef = doc(db, "posts", id);
    const unsub = onSnapshot(docRef, (doc) => {
      setPost({ ...doc.data() });
      setIsSuccess(true);
      setIsLoading(false);
    });

    return () => {
      unsub();
    };
  }, [id]);
  return { isLoading, isError, isSuccess, post, errorMsg };
};

export default useFetchSinglePost;
