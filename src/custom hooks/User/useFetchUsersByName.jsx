import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const useFetchUsersByName = (query) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "users");

    const q = query(
      usersRef,
      where("firstName", ">=", query),
      where("firstName", "<=", query)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setIsLoading(false);
      setIsSuccess(true);
      setUsers([...users]);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return { isLoading, isError, isSuccess, users, errorMsg };
};

export default useFetchUsersByName;
