import { doc, getDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

// Get a list of cities from your database
export default async function useAuth(userId) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const docRef = doc(db, "users", userId);
    getDoc(docRef)
      .then((data) => data.data())
      .then((data) => setUserDetails({ ...data }));
  }, [userId]);

  return userDetails;
}
