import { useNavigate } from "react-router-dom";
import NewPost from "../components/HomePage Components/NewPost";
import Post from "../components/HomePage Components/Post";
import Spinner from "../components/GlobalComponents/Spinner";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useGetPostsQuery } from "../features/api/apiSlice";

const HomePage = () => {
  console.log("HomePage Rendered");

  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  // const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // getting login-in user id...
        const uid = user.uid;
        console.log(uid);
        setUserId(uid);
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    });

    return unsubscribe();
  }, []);

  console.log(userId);

  const { data, isLoading, isSuccess, isError, error } =
    useGetPostsQuery(userId);

  if (isSuccess) {
    console.log("data.length: ", data.length);
    console.log("data: ", data);
  }
  if (isError) {
    console.log(error);
  }

  return (
    <div className="lg:col-start-3 lg:col-span-4 flex flex-col gap-8">
      <NewPost userId={userId} />
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

export default HomePage;
