import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const SignupForm = ({ setCurrentForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) console.log("Passwords don't match");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Add a new document in collection "cities"
        setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          username,
          email,
          createdAt: user.metadata.creationTime,
        });
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };
  return (
    <div
      className={`user-form transition-all duration-300 bg-white flex flex-col gap-8 justify-center items-center p-8`}
    >
      <div className="flex gap-1 flex-wrap">
        <p className="text-textColor">Already have an account?</p>
        <span
          className="text-accentColor cursor-pointer hover:text-accentColorHover transition-colors duration-300"
          onClick={() => setCurrentForm("login")}
        >
          sign in
        </span>
      </div>
      <form className="grid grid-cols-2 gap-8 justify-center ">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor"
          required
        />
        <input
          type="submit"
          value="Sign up"
          className="p-2 text-sm bg-accentColor text-textColorLight rounded cursor-pointer hover:bg-accentColorHover transition-colors duration-300"
          onClick={handleSignUp}
        />
      </form>
    </div>
  );
};

export default SignupForm;
