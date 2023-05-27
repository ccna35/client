import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const useFetchSingleUser = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (id === null || id === undefined) return;
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({ ...docSnap.data() });
        setIsSuccess(true);
        setIsLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        setIsError(true);
        setErrorMsg("No such document!");
        setIsSuccess(false);
        setIsLoading(false);
      }
    };

    fetchUser();

    // return () => {
    //   unsubscribe();
    // };
  }, [id]);
  return { isLoading, isError, isSuccess, user, errorMsg };
};

export default useFetchSingleUser;
