import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/GlobalComponents/Navbar/Navbar";
import UserBox from "../components/LeftSide/UserInfoBox";
import PeopleToFollow from "../components/LeftSide/PeopleToFollow";
import { io } from "socket.io-client";

// const socket = io("http://localhost:3000/");

// socket.on("message", (data) => {
//   console.log(data); // x8WIv7-mJelg7on_ALbx
// });

const Root = () => {
  return (
    <div className="bg-secondBgColor">
      <Navbar />
      <div className="container mx-auto px-4 md:px-0 lg:grid lg:grid-cols-5 gap-12 xl:max-w-4xl">
        <div className="sidebar hidden col-span-2 lg:flex flex-col gap-8">
          <UserBox />
          <PeopleToFollow />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
