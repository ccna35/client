import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/GlobalComponents/Navbar/Navbar";
import UserBox from "../components/LeftSide/UserInfoBox";
import PeopleToFollow from "../components/LeftSide/PeopleToFollow";
import { io } from "socket.io-client";
import Footer from "../components/GlobalComponents/Footer";
import LeftSide from "../components/MessagesPage/LeftSide";

const MessangerLayout = () => {
  return (
    <div className="bg-secondBgColor">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MessangerLayout;
