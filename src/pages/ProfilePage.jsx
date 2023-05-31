import Cover from "../components/ProfilePage components/Cover";
import ProfileInfo from "../components/ProfilePage components/ProfileInfo";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/GlobalComponents/Spinner";
import Post from "../components/HomePage Components/Post";
import useCheckUser from "../custom hooks/User/useCheckUser";
import useFetchPosts from "../custom hooks/Post/useFetchPosts";
import useFetchSpecificUsers from "../custom hooks/User/useFetchSpecificUsers";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

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
  } = useFetchPosts(id);

  return (
    <div className="lg:col-start-3 lg:col-span-4 flex flex-col gap-8 mx-auto max-w-xl lg:mx-0">
      <Cover />
      <ProfileInfo currentUser={currentUser} />
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

export default ProfilePage;
