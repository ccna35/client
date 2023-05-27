// import {
//   collection,
//   deleteDoc,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
//   doc,
// } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import { useEffect, useState } from "react";

// const useDeletePost = (id) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [posts, setPosts] = useState([]);

//   const deletePost = async (id) => {
//     setIsLoading(true);
//     try {
//       const res = await deleteDoc(doc(db, "posts", id));
//       setIsLoading(false);
//       return { data: res };
//     } catch (error) {
//       console.error(error.message);
//       return { error: error.message };
//     }
//   };

//   deletePost(id);

//   return { isLoading, isError, isSuccess, deletePost, errorMsg };
// };

// export default useDeletePost;
