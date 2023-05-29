import React, { useState } from "react";
import useCheckUser from "../../custom hooks/User/useCheckUser";
import { useNavigate } from "react-router-dom";
import useFetchAllUsers from "../../custom hooks/User/useFetchAllUsers";
import Spinner from "../GlobalComponents/Spinner";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const LeftSide = ({ docRefId, setDocRefId, setOtherUserInfo }) => {
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
  const { isLoading, isError, isSuccess, users, errorMsg } = useFetchAllUsers();

  if (isError) {
    console.log(errorMsg);
  }

  const currentUserData = users?.filter((user) => user.id === currentUser);

  const [searchText, setSearchText] = useState("");

  const [currentFriend, setCurrentFriend] = useState(null);

  const handleChat = async (contact2) => {
    setCurrentFriend(contact2);
    try {
      const chatsRef = collection(db, "chats");

      const q1 = query(
        chatsRef,
        where("contact1", "in", [currentUser, contact2]),
        where("contact2", "in", [currentUser, contact2])
      );

      const querySnapshot = await getDocs(q1);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
        setDocRefId(doc.id);
        console.log(doc.id, " => ", doc.data());
      });

      console.log(results);

      if (results.length === 0) {
        const docRef = await addDoc(collection(db, "chats"), {
          contact1: currentUser,
          contact2,
        });
        setDocRefId(docRef.id);
        console.log("Document written with ID: ", docRef.id);
      } else {
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <div className="col-span-2 lg:flex flex-col border border-borderColor rounded-lg p-4 bg-white flex gap-2">
      <h2 className="p-4 font-medium text-xl">Chats</h2>
      <div className="p-4">
        <input
          type="search"
          placeholder="Search users..."
          className="p-2 outline-none rounded-sm border transition-all duration-300 w-3/4 focus:border-accentColor focus:w-full"
          onChange={(e) => {
            setSearchText(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
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
              <div
                key={user.id}
                className={`flex gap-4 p-4 transition-colors duration-300 rounded-md hover:bg-gray-100 cursor-pointer ${
                  currentFriend === user.id && "bg-gray-100"
                }`}
                onClick={() => {
                  handleChat(user.id);
                  setOtherUserInfo({ ...user });
                }}
              >
                <div className="user-img w-12 h-12 rounded-full overflow-hidden">
                  <img src={user.profilePhoto || "../profile/userPhoto.png"} />
                </div>
                <div className="user-info flex flex-col">
                  <h3 className="text-textColor text-lg">
                    {user.firstName + " " + user.lastName}
                  </h3>
                  <p className="text-secTextColor text-xs">
                    Hey man I'm gonna meet u there
                  </p>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
};

export default LeftSide;
