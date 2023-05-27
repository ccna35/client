import { Link, useNavigate } from "react-router-dom";
import Spinner from "../GlobalComponents/Spinner";
import useCheckUser from "../../custom hooks/User/useCheckUser";
import useFetchSingleUser from "../../custom hooks/User/useFetchSingleUser";

function UserInfoBox() {
  const navigate = useNavigate();

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
    user: currentUser,
    errorMsg: errorMsgUser,
  } = useCheckUser();

  if (isErrorUser) {
    console.log("isErrorUser: ", errorMsgUser);
    navigate("/login");
  }

  const {
    isLoading,
    isError,
    isSuccess,
    user: userInfo,
    errorMsg,
  } = useFetchSingleUser(currentUser);

  const userPhoto = userInfo?.profilePhoto || "../profile/userPhoto.png";

  return (
    <div className="border border-borderColor rounded-lg p-4 bg-white flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <div className="user-img w-12 h-12 rounded-full overflow-hidden">
          <img src={userPhoto} />
        </div>
        <div className="user-info flex flex-col">
          <Link to={"user/" + currentUser}>
            <h3 className="text-accentColor hover:text-accentColorHover transition-colors duration-300 text-lg">
              {userInfo?.firstName + " " + userInfo?.lastName}
            </h3>
          </Link>
          <p className="text-secTextColor text-sm">@{userInfo?.username}</p>
        </div>
      </div>
      <div className="follow-group flex gap-8 items-center">
        <p>
          <span className="font-medium">{userInfo?.followers?.length}</span>{" "}
          <span className="text-secTextColor text-sm">Followers</span>
        </p>
        <p>
          <span className="font-medium">{userInfo?.following?.length}</span>{" "}
          <span className="text-secTextColor text-sm">Following</span>
        </p>
      </div>
    </div>
  );
}

export default UserInfoBox;
