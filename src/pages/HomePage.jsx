import { useNavigate } from "react-router-dom";
import NewPost from "../components/HomePage Components/NewPost";
import Post from "../components/HomePage Components/Post";
import Spinner from "../components/GlobalComponents/Spinner";
import useFetchPosts from "../custom hooks/Post/useFetchPosts";
import useCheckUser from "../custom hooks/User/useCheckUser";
import useFetchSingleUser from "../custom hooks/User/useFetchSingleUser";
import useFetchAllPosts from "../custom hooks/Post/useFetchAllPosts";

const HomePage = () => {
  const navigate = useNavigate();

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
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    isSuccess: isSuccessPosts,
    posts,
    errorMsg: errorMsgPosts,
  } = useFetchAllPosts(currentUser);

  return (
    <div className="lg:col-start-3 lg:col-span-4 flex flex-col gap-8 mx-auto max-w-xl lg:mx-0">
      <NewPost userId={currentUser} />
      <div className="flex flex-col gap-8">
        {isLoadingPosts ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <div className="grid place-items-center p-4 border rounded-lg bg-white">
            You have no posts to show :(
          </div>
        ) : (
          posts.map((post) => {
            return <Post key={post?.id} post={post} />;
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
