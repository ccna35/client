import { Outlet } from "react-router-dom";
import Navbar from "../components/GlobalComponents/Navbar/Navbar";
import UserBox from "../components/LeftSide/UserInfoBox";
import PeopleToFollow from "../components/LeftSide/PeopleToFollow";
import Footer from "../components/GlobalComponents/Footer";

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
      <Footer />
    </div>
  );
};

export default Root;
