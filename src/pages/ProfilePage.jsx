import Cover from "../components/ProfilePage components/Cover";
import ProfileInfo from "../components/ProfilePage components/ProfileInfo";
import Tabs from "../components/ProfilePage components/Tabs";

const ProfilePage = () => {
  return (
    <div className="lg:col-start-3 lg:col-span-4 flex flex-col gap-8">
      <Cover />
      <ProfileInfo />
      <Tabs />
      {/* <div className="tabs"></div> */}
    </div>
  );
};

export default ProfilePage;
