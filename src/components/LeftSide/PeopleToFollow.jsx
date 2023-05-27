import { useEffect, useState } from "react";
import UserFollow from "./UserFollow";
import UserInfoBox from "./UserInfoBox";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Spinner from "../GlobalComponents/Spinner";
import { useGetAllUsersQuery } from "../../features/api/apiSlice";
import { useSelector } from "react-redux";
import useFetchAllUsers from "../../custom hooks/User/useFetchAllUsers";
import useCheckUser from "../../custom hooks/User/useCheckUser";

function PeopleToFollow() {
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
  const { isLoading, isError, isSuccess, users, errorMsg } = useFetchAllUsers();

  if (isError) {
    console.log(errorMsg);
  }

  const currentUserData = users?.filter((user) => user.id === currentUser);

  return (
    <div className="border border-borderColor rounded-lg p-4 bg-white flex flex-col gap-8">
      <h3 className="text-lg text-textColor">People you may follow</h3>
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <Spinner />
        ) : users?.length === 0 ? (
          <div className="grid place-items-center p-4 border rounded-lg bg-white">
            There are no users to follow :(
          </div>
        ) : (
          users
            ?.filter((user) => user.id !== currentUser)
            .map((user) => {
              return (
                <UserFollow
                  key={user?.id}
                  user={user}
                  currentUserData={currentUserData}
                />
              );
            })
        )}
      </div>
    </div>
  );
}

export default PeopleToFollow;
