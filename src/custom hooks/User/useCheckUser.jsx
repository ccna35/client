import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";

const useCheckUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        setIsLoading(false);
        setIsSuccess(true);
        setUser(uid);
      } else {
        // User is signed out
        setIsLoading(false);
        setIsSuccess(false);
        setUser(null);
        setIsError(true);
        setErrorMsg("No user was found, redirecting...");
      }
    });

    // return () => {
    //   unsub();
    // }
  }, []);
  return { isLoading, isError, isSuccess, user, errorMsg };
};

export default useCheckUser;
