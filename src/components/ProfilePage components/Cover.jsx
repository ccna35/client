import { useState } from "react";
import MyModal from "../../Modals/PictureModal";
import { useParams } from "react-router-dom";
import useFetchSingleUser from "../../custom hooks/User/useFetchSingleUser";

const Cover = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    user: userInfo,
    errorMsg,
  } = useFetchSingleUser(id);

  const userCoverPhoto =
    userInfo.coverPhoto || "../profile/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg";

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="cover-pic rounded-lg overflow-hidden h-[138px] cursor-pointer">
      <img
        src={userCoverPhoto}
        className="w-full h-full object-cover"
        onClick={openModal}
      />
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        openModal={openModal}
        imgUrl={userCoverPhoto}
      />
    </div>
  );
};

export default Cover;
