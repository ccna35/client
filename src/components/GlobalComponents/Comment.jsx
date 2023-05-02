import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

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
    <div className="comment-example grid items-center grid-cols-[1fr,2fr,5fr]">
      <div className="user-img w-10 h-10 rounded-full overflow-hidden">
        <img src={comment.profilePhoto || "./profile/userPhoto.png"} alt="" />
      </div>
      <h3 className="text-textColor font-medium text-sm">
        {userDetails.firstName + " " + userDetails.lastName}
      </h3>
      <p className="text-textColor text-xs flex-grow">{comment.text}</p>
    </div>
  );
};

export default Comment;
