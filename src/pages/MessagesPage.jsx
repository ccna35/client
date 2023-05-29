import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import LeftSide from "../components/MessagesPage/LeftSide";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import useFetchMessages from "../custom hooks/Chat/useFetchMessages";
import { db } from "../firebase/config";
import useCheckUser from "../custom hooks/User/useCheckUser";
import Welcome from "../components/MessagesPage/Welcome";
import ChatContainer from "../components/MessagesPage/ChatContainer";
import useFetchSingleUser from "../custom hooks/User/useFetchSingleUser";

const MessagesPage = () => {
  const { user: currentUser } = useCheckUser();

  const {
    isLoading,
    isError,
    isSuccess,
    user: userInfo,
    errorMsg,
  } = useFetchSingleUser(currentUser);

  const [docRefId, setDocRefId] = useState(null);

  const [otherUserInfo, setOtherUserInfo] = useState({});

  return (
    <div className="container mx-auto px-4 md:px-0 lg:grid lg:grid-cols-5 gap-12 xl:max-w-5xl">
      <LeftSide
        docRefId={docRefId}
        setDocRefId={setDocRefId}
        setOtherUserInfo={setOtherUserInfo}
      />
      {docRefId === null ? (
        <Welcome />
      ) : (
        <ChatContainer
          docRefId={docRefId}
          setDocRefId={setDocRefId}
          currentUser={currentUser}
          currentUserInfo={userInfo}
          otherUserInfo={otherUserInfo}
        />
      )}
    </div>
  );
};

export default MessagesPage;
