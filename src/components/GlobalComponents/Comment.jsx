import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const docRef = doc(db, "users", comment.user);
    getDoc(docRef)
      .then((data) => data.data())
      .then((data) => {
        setUserDetails({ ...data });
      });
  }, [comment.user]);

  return (
    <div className="comment-example grid items-center grid-cols-7 gap-2">
      <div className="user-img w-10 h-10 overflow-hidden col-span-1 flex justify-start items-center rounded-full">
        <img
          src={userDetails.profilePhoto || "../profile/userPhoto.png"}
          className="w-full h-full object-cover self-start"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-6 bg-gray-100 p-2 rounded-md">
        <Link to={"/user/" + comment.user} className="w-fit">
          <h3 className="text-textColor font-medium text-sm hover:text-accentColorHover transition-colors duration-300 ">
            {userDetails.firstName + " " + userDetails.lastName}
          </h3>
        </Link>
        <p className="text-textColor text-xs flex-grow">{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
