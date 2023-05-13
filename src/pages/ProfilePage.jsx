import { onAuthStateChanged } from "firebase/auth";
import Cover from "../components/ProfilePage components/Cover";
import ProfileInfo from "../components/ProfilePage components/ProfileInfo";
import Tabs from "../components/ProfilePage components/Tabs";
import { auth, db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/GlobalComponents/Spinner";
import Post from "../components/HomePage Components/Post";
import { useGetPostsQuery } from "../features/api/apiSlice";

const ProfilePage = () => {
  const navigate = useNavigate();

  // const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery(id);

  if (isLoading) {
    console.log("Loading...");
  }

  if (isSuccess) {
    console.log(data);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed out
        // ...
        navigate("/login");
      }
    });

    return unsubscribe();
  }, []);
  return (
    <div className="lg:col-start-3 lg:col-span-4 flex flex-col gap-8">
      <Cover />
      <ProfileInfo />
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <Spinner />
        ) : data.length === 0 ? (
          <div className="grid place-items-center p-4 border rounded-lg bg-white">
            You have no posts to show :(
          </div>
        ) : (
          data.map((post) => {
            return <Post key={post?.id} post={post} />;
          })
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
