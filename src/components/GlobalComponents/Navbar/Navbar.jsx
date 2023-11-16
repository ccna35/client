import { NavLink, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { HiHome } from "react-icons/hi";
import { FaBell, FaFacebookMessenger, FaUserAlt } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // getting login-in user id...
        const uid = user.uid;
        setUserId(uid);
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    });

    return unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="py-4 px-4 md:px-0 bg-white border-b border-borderColor mb-12">
      <div className="container mx-auto flex gap-4 xl:max-w-4xl">
        <NavLink
          to="/"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          <HiHome className="text-xl" />
          <p className="hidden lg:block">Home</p>
        </NavLink>
        <SearchInput />
        <NavLink
          to={"/user/" + userId}
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          <FaUserAlt />
          <p className="hidden lg:block">Profile</p>
        </NavLink>
        {/* <NavLink
          to="/settings"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          <BsFillGearFill />
          <p className="hidden lg:block">Settings</p>
        </NavLink> */}
        {/* <div className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
          <FaBell />
          <p className="hidden lg:block">Notifications</p>
        </div> */}
        <NavLink
          to="/messages"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          <FaFacebookMessenger />
          <p className="hidden lg:block">Messages</p>
        </NavLink>
        <button
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300 cursor-pointer ml-auto"
          type="button"
          onClick={handleSignOut}
        >
          <FiLogOut />
          <p className="hidden lg:block">Log out</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
