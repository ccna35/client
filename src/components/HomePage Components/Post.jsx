import { AiFillLike } from "react-icons/ai";
import {
  FaCommentDots,
  FaShareAlt,
  FaTrash,
  FaLink,
  FaBookmark,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";

import MyModal from "../../Modals/PictureModal";
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
  Fragment,
} from "react";
import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment/moment";
import { auth, db } from "../../firebase/config";
import Comment from "../GlobalComponents/Comment";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import Spinner from "../GlobalComponents/Spinner";
import useFetchSingleUser from "../../custom hooks/User/useFetchSingleUser";
import useCheckUser from "../../custom hooks/User/useCheckUser";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Post({ post }) {
  dayjs.extend(relativeTime);

  const timePosted = dayjs().to(
    dayjs(
      new Timestamp(
        post.createdAt?.seconds,
        post.createdAt?.nanoseconds
      ).toDate()
    )
  );

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const deletePost = async (id) => {
    setIsDeletingPost(true);
    try {
      const res = await deleteDoc(doc(db, "posts", id));
      setIsDeletingPost(false);
      return res;
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  };

  const {
    isLoading,
    isError: isErrorPosts,
    isSuccess: isSuccessPosts,
    user: userInfo,
    errorMsg: errorMsgPosts,
  } = useFetchSingleUser(post.user);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
    user: currentUser,
    errorMsg: errorMsgUser,
  } = useCheckUser();

  const handleLike = async () => {
    try {
      const likesRef = doc(db, "posts", post.id);
      if (post.likes.includes(currentUser)) {
        await updateDoc(likesRef, {
          likes: arrayRemove(currentUser),
        });
      } else {
        await updateDoc(likesRef, {
          likes: arrayUnion(currentUser),
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const didUserLikeThisPost = post.likes?.includes(currentUser);

  const solutions = [
    {
      name: "Copy post link",
      description: "Copy post link to clipboard",
      icon: <FaLink />,
    },
    {
      name: "Save Post",
      description: "Add this to your saved items.",
      icon: <FaBookmark />,
    },
    {
      name: "Move to trash",
      description: "items in your trash are deleted after 30 days",
      icon: <FaTrash />,
    },
  ];

  return (
    <div className="border border-borderColor p-4 rounded-lg bg-white text-textColor flex flex-col gap-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center ">
              <div className="user-img w-12 h-12 rounded-full relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={userInfo.profilePhoto || "../profile/userPhoto.png"}
                    alt=""
                  />
                </div>
                <span className="absolute -top-1 -right-1 block w-4 h-4 rounded-full bg-green-600 border border-white"></span>
              </div>
              <div>
                <div className="user-info flex items-center gap-2">
                  <Link to={"/user/" + post.user}>
                    <h3 className="text-textColor transition-colors duration-300 text-base cursor-pointer hover:text-accentColorHover">
                      {isLoading
                        ? "Loading..."
                        : userInfo.firstName + " " + userInfo.lastName}
                    </h3>
                  </Link>
                  <p className="text-secTextColor text-sm">
                    @{isLoading ? "Loading..." : userInfo.username}
                  </p>
                </div>
                <p className="text-secTextColor text-xs">{timePosted}</p>
              </div>
            </div>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <BsThreeDots className="text-textColor" />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-4 lg:grid-cols-2">
                          {solutions
                            .filter(
                              (item) =>
                                (item.name === "Move to trash" &&
                                  post.user === currentUser) ||
                                item.name !== "Move to trash"
                            )
                            .map((item) => (
                              <div
                                key={item.name}
                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
                                onClick={() => deletePost(post.id)}
                              >
                                {item.icon}
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
          <p>{post.text}</p>
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.image}
                className="w-full h-full object-cover cursor-pointer"
                onClick={openModal}
              />
              <MyModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeModal={closeModal}
                openModal={openModal}
                imgUrl={post.image}
              />
            </div>
          )}
          <div className="interaction-icons flex gap-8 justify-center">
            <div
              className={`${
                didUserLikeThisPost
                  ? "bg-accentColor text-white"
                  : "bg-secondBgColor text-textColor"
              } cursor-pointer py-2 px-4 rounded-lg flex gap-2 transition-colors duration-300`}
              onClick={handleLike}
            >
              <AiFillLike className="text-xl" />
              <p>{post.likes?.length}</p>
            </div>
            <Link to={`/post/${post.id}`}>
              <div className="cursor-pointer py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 transition-colors duration-300">
                <FaCommentDots className="text-xl" />
                <p>{post.comments.length}</p>
              </div>
            </Link>
            <div className="cursor-pointer py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 transition-colors duration-300">
              <FaShareAlt className="text-xl" />
              <p>0</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
