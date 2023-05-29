import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import useFetchMessages from "../../custom hooks/Chat/useFetchMessages";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const ChatContainer = ({
  docRefId,
  setDocRefId,
  currentUser,
  currentUserInfo,
  otherUserInfo,
}) => {
  dayjs.extend(relativeTime);

  const [msg, setMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSendMessage = async () => {
    if (msg) {
      try {
        const docRef2 = doc(db, "chats", docRefId);
        const colRef = collection(docRef2, "messages");
        setMsg("");
        await addDoc(colRef, {
          senderId: currentUser,
          createdAt: serverTimestamp(),
          text: msg,
        });
      } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
      }
    }
  };

  const { isLoading, isError, isSuccess, messages, errorMsg } =
    useFetchMessages(docRefId);

  if (isError) {
    console.log(errorMsg);
  }

  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className="lg:col-start-3 lg:col-span-4 border border-borderColor rounded-lg p-4 bg-white flex flex-col gap-8">
      <div className="messages-container flex flex-col gap-4 border-b p-4 h-[30rem] overflow-y-scroll">
        {messages?.map((message) => {
          return (
            <div
              className={`message-container flex flex-col gap-2 ${
                message.senderId === currentUser
                  ? "self-end items-end"
                  : "self-start"
              }`}
              key={message.id}
            >
              <p className="text-xs text-gray-600 font-medium">
                {message.senderId === currentUser
                  ? currentUserInfo.firstName + " " + currentUserInfo.lastName
                  : otherUserInfo.firstName + " " + otherUserInfo.lastName}
              </p>
              <p
                className={`p-2 text-white rounded-lg text-sm w-fit ${
                  message.senderId === currentUser
                    ? "bg-blue-500"
                    : "bg-gray-400 self-start"
                }`}
              >
                {message.text}
              </p>
              <span className="text-xs text-gray-500">
                {dayjs().to(
                  dayjs(
                    new Timestamp(
                      message.createdAt?.seconds,
                      message.createdAt?.nanoseconds
                    ).toDate()
                  )
                )}
              </span>
            </div>
          );
        })}
        <div ref={ref} />
      </div>
      <div className="relative">
        <div className="absolute right-4 bottom-4">
          <FaRegSmileBeam
            className="text-orange-500 text-xl"
            onClick={() => {
              setIsVisible(true);
            }}
          />
          {isVisible && (
            <Picker
              previewPosition="none"
              data={data}
              onEmojiSelect={(e) => {
                setMsg((prev) => prev + e.native);
                setIsVisible(false);
              }}
            />
          )}
        </div>
        <textarea
          name="post"
          placeholder="What’s on your mind?"
          id=""
          maxLength={280}
          className="border border-borderColor rounded-lg p-4 outline-none focus:border-accentColor transition-colors duration-300 w-full"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") handleSendMessage();
          }}
        />
        <button
          type="button"
          className="py-2 px-4 text-white rounded-lg bg-accentColor hover:bg-accentColorHover transition-colors duration-300"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
