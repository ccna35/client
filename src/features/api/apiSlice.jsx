// Import the RTK Query methods from the React-specific entry point
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
          const docRef = doc(db, "users", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      async queryFn() {
        try {
          const q = query(
            collection(db, "users"),
            orderBy("createdAt", "desc")
          );
          // posts is the collection name
          const querySnaphot = await getDocs(q);
          let users = [];
          querySnaphot?.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
          });
          return { data: users };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["User"],
    }),
    addPost: builder.mutation({
      async queryFn({ userId, text = null, image = null }) {
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
    deletePost: builder.mutation({
      async queryFn(id) {
        try {
          const res = await deleteDoc(doc(db, "posts", id));

          return { data: res };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Post"],
    }),
    registerUser: builder.mutation({
      queryFn(data) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            const user = userCredential.user;

            setDoc(doc(db, "users", user.uid), {
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              email: data.email,
              createdAt: user.metadata.creationTime,
              profilePhoto: null,
              coverPhoto: null,
              following: [],
              followers: [],
            });
          })
          .catch((err) => console.log(err));
      },
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      queryFn({ email, password }) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            return userCredential;
          })
          .catch((err) => {
            console.log(err.message);
            return { error: err.message };
          });
      },
      invalidatesTags: ["User"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useFetchSingleUserQuery,
  useFetchSinglePostQuery,
  useAddPostMutation,
  useGetAllUsersQuery,
  useDeletePostMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = apiSlice;
