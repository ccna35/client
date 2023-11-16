import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";

function UserFollow({ user, currentUserData }) {
  const userPhoto = user.profilePhoto || "../profile/userPhoto.png";

  const [doIFollowThisUser, setDoIFollowThisUser] = useState(false);

  const handleFollow = async () => {
    try {
      // We first add the user to our "following" array if he isn't already there.
      const myUserRef = doc(db, "users", currentUserData.id);
      const otherUserRef = doc(db, "users", user.id);
      if (currentUserData.following.includes(user.id)) {
        // He is in my "following" array hence I'm following him
        setDoIFollowThisUser(true);
        await updateDoc(myUserRef, {
          following: arrayRemove(user.id),
        });
        // We then remove our ID from his "followers" array.
        await updateDoc(otherUserRef, {
          followers: arrayRemove(currentUserData.id),
        });
      } else {
        // He is't in my "following" array hence I'm not following him
        setDoIFollowThisUser(false);
        await updateDoc(myUserRef, {
          following: arrayUnion(user.id),
        });
        // We then add our ID to his "followers" array.
        await updateDoc(otherUserRef, {
          followers: arrayUnion(currentUserData.id),
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="rounded-lg bg-white flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <div className="user-img w-12 h-12 rounded-full overflow-hidden">
          <img src={userPhoto} />
        </div>
        <div className="user-info flex flex-col">
          <Link to={"/user/" + user.id}>
            <h3 className="text-textColor text-lg transition-colors duration-300 cursor-pointer hover:text-accentColorHover">
              {user.firstName + " " + user.lastName}
            </h3>
          </Link>
          <p className="text-secTextColor text-sm">@{user.username}</p>
        </div>
      </div>
      {currentUserData.id !== user.id && (
        <button
          type="button"
          className={`${
            currentUserData.following.includes(user.id)
              ? "bg-secondBgColor text-textColor"
              : "bg-accentColor text-white"
          } py-2 px-4 rounded-lg hover:bg-accentColorHover hover:text-white transition-colors duration-300`}
          onClick={handleFollow}
        >
          {currentUserData.following.includes(user.id) ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
}

export default UserFollow;
