import { useState } from "react";
import MyModal from "../../Modals/PictureModal";
import { useLocation, useParams } from "react-router-dom";
import { useFetchSingleUserQuery } from "../../features/api/apiSlice";
import Spinner from "../GlobalComponents/Spinner";

const ProfileInfo = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess, isError, error } =
    useFetchSingleUserQuery(id);

  console.log(data);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let location = useLocation();

  if (isLoading) {
    return <Spinner />;
  }

  const userPhoto = data.profilePhoto || "../profile/userPhoto.png";

  return (
    <div className="profile-info rounded-lg py-4 px-8 bg-white flex justify-between items-start">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <div className="user-img w-16 h-16 rounded-full overflow-hidden cursor-pointer">
            <img src={userPhoto} onClick={openModal} />
            <MyModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              closeModal={closeModal}
              openModal={openModal}
              imgUrl={userPhoto}
            />
          </div>
          <div className="user-info flex flex-col">
            <h3 className="text-accentColor hover:text-accentColorHover transition-colors duration-300 text-lg">
              {data?.firstName + " " + data?.lastName}
            </h3>
            <p className="text-secTextColor text-sm">@{data.username}</p>
          </div>
        </div>
        <div className="follow-group flex gap-8 items-center">
          <p>
            <span className="font-medium">{data?.followers?.length}</span>{" "}
            <span className="text-secTextColor text-sm">Followers</span>
          </p>
          <p>
            <span className="font-medium">{data?.following?.length}</span>{" "}
            <span className="text-secTextColor text-sm">Following</span>
          </p>
        </div>
      </div>
      {location.pathname === "/profile" ? (
        <button
          type="button"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
        >
          Edit Profile
        </button>
      ) : (
        <button
          type="button"
          className="py-2 px-4 text-white rounded-lg bg-accentColor hover:bg-accentColorHover transition-colors duration-300"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default ProfileInfo;
