import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore/lite";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";

const SignupForm = ({ setCurrentForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    setIsLoading(true);
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
          profilePhoto: null,
          coverPhoto: null,
          following: [],
          followers: [],
        });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
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
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="submit"
          value={isLoading ? "Signing up..." : "Sign up"}
          className="p-2 text-sm bg-accentColor text-textColorLight rounded cursor-pointer hover:bg-accentColorHover transition-colors duration-300"
          onClick={handleSignUp}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default SignupForm;
