import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore/lite";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { useFormik } from "formik";

const SignupForm = ({ setCurrentForm }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (values) => {
    const { firstName, lastName, username, password, email } = values;

    setIsLoading(true);

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
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        setErrorMsg(error.message);
        console.log(errorMessage);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length > 20) {
      errors.username = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}\[\]|\\;:'",.<>/?]).{8,}$/i.test(
        values.password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters long, contains at least 1 number, one lowercase letter, one uppercase letter & one special character.";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      return handleSignUp(values);
    },
  });

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
      <form
        className="grid grid-cols-2 gap-8 justify-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
            required
            // onChange={(e) => setFirstName(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <p className="text-red-600 text-sm">{formik.errors.firstName}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <p className="text-red-600 text-sm">{formik.errors.lastName}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username && (
            <p className="text-red-600 text-sm">{formik.errors.username}</p>
          )}
        </div>

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
            // onChange={(e) => setPassword(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
            required
            // onChange={(e) => setConfirmPassword(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-600 text-sm">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <input
          type="submit"
          value={isLoading ? "Signing up..." : "Sign up"}
          className="p-2 text-sm bg-accentColor text-textColorLight rounded cursor-pointer hover:bg-accentColorHover transition-colors duration-300"
          disabled={isLoading}
        />
      </form>
      {errorMsg && (
        <div className="py-2 px-4 rounded-lg border border-red-500 bg-red-100 text-red-700 text-sm">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default SignupForm;
