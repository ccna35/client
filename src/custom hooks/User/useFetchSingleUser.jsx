import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const useFetchSingleUser = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (id === null || id === undefined) return;
    const docRef = doc(db, "users", id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setUser({ ...doc.data() });
      setIsSuccess(true);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [id]);
  return { isLoading, isError, isSuccess, user, errorMsg };
};

export default useFetchSingleUser;
