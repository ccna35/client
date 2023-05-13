// Import the RTK Query methods from the React-specific entry point
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn(uid) {
        try {
          const q = query(
            collection(db, "posts"),
            where("user", "==", uid),
            orderBy("createdAt", "desc")
          );
          // posts is the collection name
          const querySnaphot = await getDocs(q);
          let posts = [];
          querySnaphot?.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
          });
          return { data: posts };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["Post"],
    }),
    fetchSinglePost: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "posts", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Post"],
    }),
    fetchSingleUser: builder.query({
      async queryFn(id) {
        try {
          console.log(id);
          const docRef = doc(db, "users", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["User"],
    }),
    addPost: builder.mutation({
      async queryFn({ userId, text, image }) {
        console.log(userId, text, image);
        try {
          const docRef = await addDoc(collection(db, "posts"), {
            user: userId,
            text,
            createdAt: serverTimestamp(),
            image,
            comments: [],
          });
          let msg = "Post added with ID: " + docRef.id;
          return { data: msg };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useFetchSingleUserQuery,
  useFetchSinglePostQuery,
  useAddPostMutation,
} = apiSlice;
