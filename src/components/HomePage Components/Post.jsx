import { AiFillLike } from "react-icons/ai";
import { FaCommentDots, FaShareAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import MyModal from "../../Modals/PictureModal";
import { Component, useCallback, useEffect, useMemo, useState } from "react";
import {
  Timestamp,
  addDoc,
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
import useAuth from "../../custom hooks/useAuth";
import { auth, db } from "../../firebase/config";
import Comment from "../GlobalComponents/Comment";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

function Post({
  text,
  createdAt,
  user,
  image,
  postId,
  comments,
  setIsLoading,
  post,
}) {
  console.log("Post Rendered");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);

  const [userDetails, setUserDetails] = useState({});
  const [currentUserDetails, setCurrentUserDetails] = useState({});

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    // fetching comments...
    const commentsCol = collection(db, "comments");
    const q = query(commentsCol, where("post", "==", post.id));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setCommentList((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
    });
  }, []);

  useEffect(() => {
    const docRef = doc(db, "users", post.user);
    getDoc(docRef)
      .then((data) => data.data())
      .then((data) => {
        setUserDetails({ ...data });
      });
  }, [post.user]);

  const timePosted = moment(
    new Timestamp(post.createdAt?.seconds, post.createdAt?.nanoseconds).toDate()
  ).fromNow();
  // const timePosted = "a few seconds ago";

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [comment, setComment] = useState("");

  const [likes, setLikes] = useState(0);

  const addNewComment = async () => {
    try {
      const commentsRef = doc(db, "posts", post.id);
      const updateComments = await updateDoc(commentsRef, {
        comments: arrayUnion({
          user: post.user,
          text: comment,
          createdAt: new Date().getTime(),
          id: uuidv4(),
        }),
      });

      console.log("Document written with ID: ", commentsRef.id);
      setComment("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "posts", post.id));
  };

  return (
    <div className="border border-borderColor p-4 rounded-lg bg-white text-textColor flex flex-col gap-4">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center ">
          <div className="user-img w-12 h-12 rounded-full relative">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={userPhoto || "./profile/userPhoto.png"} alt="" />
            </div>
            <span className="absolute -top-1 -right-1 block w-4 h-4 rounded-full bg-green-600 border border-white"></span>
          </div>
          <div>
            <div className="user-info flex items-center gap-2">
              <h3 className="text-textColor transition-colors duration-300 text-base">
                {userDetails.firstName + " " + userDetails.lastName}
              </h3>
              <p className="text-secTextColor text-sm">
                @{userDetails.username}
              </p>
            </div>
            <p className="text-secTextColor text-xs">{timePosted}</p>
          </div>
        </div>
        <MdDelete
          className="text-xl self-start hover:text-accentColorHover transition-colors duration-300 cursor-pointer"
          onClick={handleDelete}
        />
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
          className="cursor-pointer py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300"
          onClick={() => {
            setLikes((prev) => prev + 1);
            console.log(likes);
          }}
        >
          <AiFillLike className="text-xl" />
          <p>{likes}</p>
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
            src={currentUserDetails?.profilePhoto || "./profile/userPhoto.png"}
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
              console.log(e.target.value);
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
        className="flex flex-col gap-2"
      >
        {post.comments?.map((comment, index) => {
          return <Comment comment={comment} key={comment?.id} />;
        })}
      </motion.div>
    </div>
  );
}

export default Post;
