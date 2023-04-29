import { useState } from "react";
import LoginForm from "../components/LoginPage/LoginForm";
import SignupForm from "../components/LoginPage/SignupForm";

const LoginPage = () => {
  const [currentForm, setCurrentForm] = useState("login");
  return (
    <section className="h-screen ">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="slider bg-orange-500 h-screen overflow-hidden rounded-md order-last sm:order-first">
          <img
            src="./annie-spratt-PM4Vu1B0gxk-unsplash.jpg"
            alt=""
            className="transition-all duration-500 w-full h-full object-cover"
          />
        </div>
        {currentForm === "login" ? (
          <LoginForm setCurrentForm={setCurrentForm} />
        ) : (
          <SignupForm setCurrentForm={setCurrentForm} />
        )}
      </div>
    </section>
  );
};

export default LoginPage;
