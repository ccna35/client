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
import { motion } from "framer-motion";

const HomePage = () => {
  console.log("HomePage Rendered");

  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    });

    return unsubscribe();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), where("user", "==", userId));
    onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push({ id: doc.id, ...doc.data() });
      });
      setPosts([...cities]);
    });

    setIsLoading(false);
  }, [userId]);

  return (
    <div className="lg:col-start-3 lg:col-span-4 flex flex-col gap-8">
      <NewPost userId={userId} />
      <motion.div layout className="flex flex-col gap-8">
        {isLoading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <div className="grid place-items-center p-4 border rounded-lg bg-white">
            You have no posts to show :(
          </div>
        ) : (
          posts.map((post) => {
            return (
              <Post key={post?.id} post={post} setIsLoading={setIsLoading} />
            );
          })
        )}
      </motion.div>
    </div>
  );
};

export default HomePage;
