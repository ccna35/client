import { useState } from "react";
import MyModal from "../../Modals/PictureModal";

const Cover = () => {
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
        src="../profile/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg"
        className="w-full h-full object-cover"
        onClick={openModal}
      />
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        openModal={openModal}
        imgUrl="../profile/daiga-ellaby-ClWvcrkBhMY-unsplash.jpg"
      />
    </div>
  );
};

export default Cover;
