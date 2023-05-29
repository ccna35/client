import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";

const useFetchMessages = (docRefId = "Lzu8V0OTYjAyrLMmZ1sI") => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const docRef2 = doc(db, "chats", docRefId);
    const colRef = query(
      collection(docRef2, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setIsLoading(false);
      setIsSuccess(true);
      setMessages([...messages]);
    });

    return () => {
      unsubscribe();
    };
  }, [docRefId]);
  return { isLoading, isError, isSuccess, messages, errorMsg };
};

export default useFetchMessages;
