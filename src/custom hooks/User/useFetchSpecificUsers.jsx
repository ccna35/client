import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const useFetchSpecificUsers = async (usersArray) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState([]);

  const usersRef = collection(db, "users");

  const q = query(usersRef, where("user", "in", usersArray));

  try {
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    setUsers([...results]);
    setIsSuccess(true);
    setIsLoading(false);
  } catch (error) {
    setIsError(true);
    errorMsg(error.message);
  }

  return { isLoading, isError, isSuccess, users, errorMsg };
};

export default useFetchSpecificUsers;
