import { useMemo, useState } from "react";
import MyModal from "../../Modals/PictureModal";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../GlobalComponents/Spinner";
import useFetchSingleUser from "../../custom hooks/User/useFetchSingleUser";
import EditProfileModal from "../../Modals/EditProfileModal";
import useFetchSpecificUsers from "../../custom hooks/User/useFetchSpecificUsers";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import useFetchAllUsers from "../../custom hooks/User/useFetchAllUsers";
import UsersModal from "../../Modals/UserModal";

const ProfileInfo = ({ currentUser }) => {
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);

  function closeUsersModal() {
    setIsUsersModalOpen(false);
  }

  function openUsersModal() {
    setIsUsersModalOpen(true);
  }

  const { id } = useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    user: userInfo,
    errorMsg,
  } = useFetchSingleUser(id);

  const {
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    isSuccess: isSuccessUsers,
    users,
    errorMsg: errorMsgUsers,
  } = useFetchAllUsers();

  if (isLoadingUsers) {
    console.log("Fetching...");
  }
  if (isErrorUsers) {
    console.log(errorMsgUsers);
  }
  if (isSuccessUsers) {
    console.log(users);
  }

  const followers = useMemo(
    () => users.filter(({ id }) => userInfo?.followers.includes(id)),
    [users]
  );

  const following = useMemo(
    () => users.filter(({ id }) => userInfo?.following.includes(id)),
    [users]
  );

  console.log(followers);
  console.log(following);

  let [isOpen, setIsOpen] = useState(false);

  // Controls the user image modal.
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Controls the Edit Profile modal.
  function closeEditProfileModal() {
    setIsEditProfileOpen(false);
  }

  function openEditProfileModal() {
    setIsEditProfileOpen(true);
  }

  const userPhoto = userInfo.profilePhoto || "../profile/userPhoto.png";

  // const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  // const [isSuccessUsers, setIsSuccessUsers] = useState(false);
  // const [isErrorUsers, setIsErrorUsers] = useState(false);
  // const [errorMsgUsers, setErrorMsgUsers] = useState(null);
  // const [users, setUsers] = useState([]);

  // const getFollowersList = async (usersArray) => {
  //   setIsLoadingUsers(true);
  //   const results = [];

  //   for (let user of usersArray) {
  //     const userRef = doc(db, "users", user);

  //     try {
  //       const docSnap = await getDoc(userRef);
  //       results.push({ id: docSnap.id, ...docSnap.data() });
  //     } catch (error) {
  //       console.log(error.message);
  //       // setIsErrorUsers(true);
  //       // setErrorMsgUsers(error.message);
  //     }
  //   }

  //   setIsLoadingUsers(false);
  //   // setIsSuccessUsers(true);
  //   console.log(results);

  //   // setUsers([...results]);

  //   // return results;
  // };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile-info rounded-lg p-4 bg-white flex justify-between items-start">
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
              {userInfo?.firstName + " " + userInfo?.lastName}
            </h3>
            <p className="text-secTextColor text-sm">@{userInfo.username}</p>
          </div>
        </div>
        <div className="follow-group flex gap-8 items-center">
          <p onClick={openUsersModal} className="cursor-pointer">
            <span className="font-medium">{userInfo?.followers?.length}</span>{" "}
            <span className="text-secTextColor text-sm">Followers</span>
          </p>
          <p onClick={openUsersModal} className="cursor-pointer">
            <span className="font-medium">{userInfo?.following?.length}</span>{" "}
            <span className="text-secTextColor text-sm">Following</span>
          </p>
        </div>
      </div>
      {currentUser === id ? (
        <button
          type="button"
          className="py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
          onClick={openEditProfileModal}
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
      <EditProfileModal
        isEditProfileOpen={isEditProfileOpen}
        setIsEditProfileOpen={setIsEditProfileOpen}
        closeEditProfileModal={closeEditProfileModal}
        openEditProfileModal={openEditProfileModal}
        userInfo={{ id, ...userInfo }}
      />

      <UsersModal
        isUsersModalOpen={isUsersModalOpen}
        closeUsersModal={closeUsersModal}
        openUsersModal={openUsersModal}
        followers={followers}
        following={following}
      />
    </div>
  );
};

export default ProfileInfo;
