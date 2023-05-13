import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { getUserId, updateUserStatus } from "../../features/user/userSlice";

const LoginForm = ({ setCurrentForm }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setErrorMsg("");
        dispatch(updateUserStatus(true));
        dispatch(getUserId(user.uid));
        navigate("/");
        // ...
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.log(error.message);
      });
  };
  return (
    <div
      className={`user-form transition-all duration-300 bg-white flex flex-col gap-8 justify-center items-center p-8 $`}
    >
      <div className="flex gap-1">
        <p className="text-textColor">Sign in</p>
        <span
          className="text-accentColor cursor-pointer hover:text-accentColorHover transition-colors duration-300"
          onClick={() => setCurrentForm("signup")}
        >
          or create a new account
        </span>
      </div>
      <form
        action=""
        className="flex flex-col gap-8 justify-center w-3/4 xl:w-1/2"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email..."
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Enter your password..."
          className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && (
          <div className="py-2 px-4 rounded-lg border border-red-500 bg-red-100 text-red-700 text-sm">
            {errorMsg}
          </div>
        )}

        <input
          type="submit"
          value="Login"
          className="p-2 text-sm bg-accentColor text-textColorLight rounded cursor-pointer hover:bg-accentColorHover transition-colors duration-300"
          onClick={handleLogin}
        />
      </form>
    </div>
  );
};

export default LoginForm;
