import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useFormik } from "formik";

const LoginForm = ({ setCurrentForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { password, email } = values;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setErrorMsg("");
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.message.includes("user-not-found"))
          setErrorMsg("Either email or password is incorrect!");
        setIsLoading(false);
      });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      return handleLogin(values);
    },
  });

  return (
    <div
      className={`user-form transition-all duration-300 bg-white flex flex-col gap-8 justify-center items-center p-8 $`}
    >
      <div className="p-2 rounded-md border border-gray-400 flex flex-col gap-1">
        <p>Use the credentials below to log in with a test account:</p>
        <p>
          <span className="font-medium">Email:</span> ian_danial@yahoo.com
        </p>
        <p>
          <span className="font-medium">Password:</span> 123456
        </p>
      </div>
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
        className="flex flex-col gap-8 justify-center w-3/4 xl:w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 text-sm">{formik.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 text-sm">{formik.errors.password}</p>
          )}
        </div>
        {errorMsg && (
          <div className="py-2 px-4 rounded-lg border border-red-500 bg-red-100 text-red-700 text-sm">
            {errorMsg}
          </div>
        )}

        <input
          type="submit"
          value={isLoading ? "Loading..." : "Login"}
          disabled={isLoading}
          className="p-2 text-sm bg-accentColor text-textColorLight rounded cursor-pointer hover:bg-accentColorHover transition-colors duration-300 disabled:bg-gray-400"
        />
      </form>
    </div>
  );
};

export default LoginForm;
