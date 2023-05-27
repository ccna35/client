import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../components/HomePage Components/Post";
import Spinner from "../components/GlobalComponents/Spinner";
import useFetchPosts from "../custom hooks/Post/useFetchPosts";
import useCheckUser from "../custom hooks/User/useCheckUser";
import useFetchSinglePost from "../custom hooks/Post/useFetchSinglePost";
import useFetchSingleUser from "../custom hooks/User/useFetchSingleUser";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Timestamp,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import MyModal from "../Modals/PictureModal";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots, FaShareAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { motion } from "framer-motion";
import { db } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import Comment from "../components/GlobalComponents/Comment";

const PostPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

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
    isLoading: isLoadingPost,
    isError: isErrorPost,
    isSuccess: isSuccessPost,
    post,
    errorMsg: errorMsgPost,
  } = useFetchSinglePost(id);

  dayjs.extend(relativeTime);

  const timePosted = dayjs().to(
    dayjs(
      new Timestamp(
        post?.createdAt?.seconds,
        post?.createdAt?.nanoseconds
      ).toDate()
    )
  );

  const {
    isLoading,
    isError: isErrorUserInfo,
    isSuccess: isSuccessUserInfo,
    user: userInfo,
    errorMsg: errorMsgUserInfo,
  } = useFetchSingleUser(post.user);

  const [comment, setComment] = useState("");

  const addNewComment = async () => {
    try {
      const commentsRef = doc(db, "posts", id);
      const updateComments = await updateDoc(commentsRef, {
        comments: arrayUnion({
          user: currentUser,
          text: comment,
          createdAt: new Date().getTime(),
          id: uuidv4(),
        }),
      });

      setComment("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleLike = async () => {
    try {
      const likesRef = doc(db, "posts", id);
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
    <div className="lg:col-start-3 lg:col-span-4 p-4 rounded-lg bg-white text-textColor flex flex-col gap-4 mx-auto max-w-xl lg:mx-0">
      {isLoadingUser || isLoadingPost ? (
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
                      {isLoadingUser || isLoadingPost
                        ? "Loading..."
                        : userInfo.firstName + " " + userInfo.lastName}
                    </h3>
                  </Link>
                  <p className="text-secTextColor text-sm">
                    @
                    {isLoadingUser || isLoadingPost
                      ? "Loading..."
                      : userInfo.username}
                  </p>
                </div>
                <p className="text-secTextColor text-xs">{timePosted}</p>
              </div>
            </div>
            {/* {isDeletingPost ? (
              <CgSpinner className="animate-spin text-xl text-accentColor" />
            ) : (
              <MdDelete
                className="text-xl self-start hover:text-accentColorHover transition-colors duration-300 cursor-pointer"
                onClick={() => deletePost(post.id)}
              />
            )} */}
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
            <div className="cursor-pointer py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300">
              <FaCommentDots className="text-xl" />
              <p>{post.comments.length}</p>
            </div>
            <div className="cursor-pointer py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300">
              <FaShareAlt className="text-xl" />
              <p>0</p>
            </div>
          </div>
          <hr />
          <div className="new-comment flex gap-4 items-center">
            <div className="user-img w-10 h-10 rounded-full overflow-hidden">
              <img
                src={userInfo?.profilePhoto || "../profile/userPhoto.png"}
                alt=""
              />
            </div>
            <div className="flex-grow flex gap-2 items-center">
              <input
                type="text"
                name="newComment"
                placeholder="Write a comment..."
                className=" bg-secondBgColor text-secTextColor rounded-lg text-sm p-2 outline-none flex-grow"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <IoSend
                className="text-accentColor cursor-pointer hover:text-accentColorHover"
                onClick={addNewComment}
              />
            </div>
          </div>
          <motion.div
            layout
            animate={{ opacity: 1 }}
            transition={{
              opacity: { ease: "linear" },
              layout: { duration: 0.3 },
            }}
            className="flex flex-col gap-4"
          >
            {post.comments?.map((comment) => {
              return <Comment comment={comment} key={comment?.id} />;
            })}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default PostPage;
