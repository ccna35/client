import { AiFillLike } from "react-icons/ai";
import { FaCommentDots, FaShareAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";

import MyModal from "../../Modals/PictureModal";
import { Component, useCallback, useEffect, useMemo, useState } from "react";
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
            {currentUser === post.user && isDeletingPost ? (
              <CgSpinner className="animate-spin text-xl text-accentColor" />
            ) : (
              <MdDelete
                className="text-xl self-start hover:text-accentColorHover transition-colors duration-300 cursor-pointer"
                onClick={() => deletePost(post.id)}
              />
            )}
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
