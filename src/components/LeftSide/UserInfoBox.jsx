import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { useFetchSingleUserQuery } from "../../features/api/apiSlice";
import Spinner from "../GlobalComponents/Spinner";

function UserInfoBox() {
  console.log("UserInfoBox Rendered");

  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        // const docRef = doc(db, "users", uid);
        // getDoc(docRef)
        //   .then((data) => data.data())
        //   .then((data) => {
        //     setUserDetails({ ...data });
        //   });
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    });

    return unsubscribe();
  }, []);

  const userPhoto = userDetails.profilePhoto || "../profile/userPhoto.png";

  const { data, isLoading, isSuccess, isError, error } =
    useFetchSingleUserQuery(userId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess) {
    return (
      <div className="border border-borderColor rounded-lg p-4 bg-white flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <div className="user-img w-12 h-12 rounded-full overflow-hidden">
            <img src={userPhoto} />
          </div>
          <div className="user-info flex flex-col">
            <Link to={"user/" + userId}>
              <h3 className="text-accentColor hover:text-accentColorHover transition-colors duration-300 text-lg">
                {data?.firstName + " " + data?.lastName}
              </h3>
            </Link>
            <p className="text-secTextColor text-sm">@{data?.username}</p>
          </div>
        </div>
        <div className="follow-group flex gap-8 items-center">
          <p>
            <span className="font-medium">{data?.followers?.length}</span>{" "}
            <span className="text-secTextColor text-sm">Followers</span>
          </p>
          <p>
            <span className="font-medium">{data?.following?.length}</span>{" "}
            <span className="text-secTextColor text-sm">Following</span>
          </p>
        </div>
      </div>
    );
  }
}

export default UserInfoBox;
