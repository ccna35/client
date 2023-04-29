import { NavLink, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { HiHome } from "react-icons/hi";
import { FaBell, FaFacebookMessenger, FaUserAlt } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
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

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <nav className="py-4 px-4 md:px-0 bg-white border-b border-borderColor mb-12">
      <div className="container mx-auto flex justify-between">
        <NavLink
          to="/"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          <HiHome className="text-xl" />
          <p className="hidden lg:block">Home</p>
        </NavLink>
        <SearchInput />
        <NavLink
          to="/profile"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          <FaUserAlt />
          <p className="hidden lg:block">Profile</p>
        </NavLink>
        <NavLink
          to="/settings"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          <BsFillGearFill />
          <p className="hidden lg:block">Settings</p>
        </NavLink>
        <div className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
          <FaBell />
          <p className="hidden lg:block">Notifications</p>
        </div>
        <NavLink
          to="/messages"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          <FaFacebookMessenger />
          <p className="hidden lg:block">Messages</p>
        </NavLink>
        <div className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
          <FiLogOut />
          <p className="hidden lg:block" onClick={handleSignOut}>
            Log out
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
