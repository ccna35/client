import { useNavigate } from "react-router-dom";
import NewPost from "../components/HomePage Components/NewPost";
import Post from "../components/HomePage Components/Post";
import useFetchPosts from "../custom hooks/useFetchPosts";
import { db, getPosts } from "../firebase/config";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCftaxupb8F0cgeA8cG-LebDbB3copWCHA",
  authDomain: "social-media-d89dd.firebaseapp.com",
  projectId: "social-media-d89dd",
  storageBucket: "social-media-d89dd.appspot.com",
  messagingSenderId: "909295195071",
  appId: "1:909295195071:web:557f78e0c7196d9085870a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const HomePage = () => {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user;
      console.log(uid);
      // const posts = useFetchPosts();
      // ...
    } else {
      // User is signed out
      // ...
      navigate("/login");
    }
  });

  return (
    <div className="lg:col-start-3 lg:col-span-4 flex flex-col gap-8">
      <NewPost />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default HomePage;
