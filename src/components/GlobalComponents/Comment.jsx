import { Timestamp, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

  dayjs.extend(relativeTime);

  const timePosted = dayjs().to(dayjs(comment?.createdAt));

  return (
    <div className="comment-example flex items-start gap-2">
      <div className="user-img w-10 h-10 overflow-hidden col-span-1 flex justify-start items-center rounded-full flex-shrink-0">
        <img
          src={userDetails.profilePhoto || "../profile/userPhoto.png"}
          className="w-full h-full object-cover self-start"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-6 bg-gray-100 p-2 rounded-md">
        <div>
          <Link to={"/user/" + comment.user} className="w-fit">
            <h3 className="inline-block text-textColor font-semibold text-sm hover:text-accentColorHover transition-colors duration-300 ">
              {userDetails.firstName + " " + userDetails.lastName}
            </h3>
          </Link>
          <span className="text-xs block text-gray-500">{timePosted}</span>
        </div>
        <p className="text-textColor text-xs flex-grow">{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
