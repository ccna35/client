import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { IoDocumentsSharp, IoCloseCircleSharp } from "react-icons/io5";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function EditProfileModal({
  isEditProfileOpen,
  setIsEditProfileOpen,
  closeEditProfileModal,
  openEditProfileModal,
  userInfo,
}) {
  const userPhoto = userInfo.profilePhoto || "../profile/userPhoto.png";

  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [profileFile, setProfileFile] = useState(null);
  const [profileImageLink, setProfileImageLink] = useState(
    userInfo.profilePhoto
  );
  const [coverFile, setCoverFile] = useState(null);
  const [coverImageLink, setCoverImageLink] = useState(userInfo.coverPhoto);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myUserRef = doc(db, "users", userInfo.id);

    // We first upload the profile & cover images if they exist.
    if (selectedProfileImage !== null) {
      uploadProfileImage();
    }

    if (selectedCoverImage !== null) {
      uploadCoverImage();
    }

    if (firstName !== userInfo.firstName) {
      await updateDoc(myUserRef, {
        firstName,
      });
    }

    if (lastName !== userInfo.lastName) {
      await updateDoc(myUserRef, {
        lastName,
      });
    }

    closeEditProfileModal();
  };

  const deleteImage = () => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, "images/" + file.name);

    // Delete the file
    deleteObject(desertRef)
      .then((data) => {
        // File deleted successfully
        console.log(data);
        setImageLink("");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  // Handling profile photo
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);

  const profileImgRef = useRef();

  // This function will be triggered when the file field change
  const profileImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0].name);
      setSelectedProfileImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedProfileImage = () => {
    setSelectedProfileImage(null);
    profileImgRef.current.value = "";
  };

  // Handling cover photo
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);

  const coverImgRef = useRef();

  const coverImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0].name);
      setSelectedCoverImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedCoverImage = () => {
    setSelectedCoverImage(null);
    coverImgRef.current.value = "";
  };

  // This function handles the cancel button
  const handleCancelBtn = () => {
    setSelectedCoverImage(null);
    coverImgRef.current.value = "";
    setSelectedProfileImage(null);
    profileImgRef.current.value = "";
    closeEditProfileModal();
  };

  const uploadProfileImage = () => {
    // let file = e.target.files[0];

    // setProfileFile(e.target.files[0]);

    const storage = getStorage();

    // Create the file metadata
    const metadata = {
      contentType: selectedProfileImage.type,
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + selectedProfileImage.name);
    const uploadTask = uploadBytesResumable(
      storageRef,
      selectedProfileImage,
      metadata
    );

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const myUserRef = doc(db, "users", userInfo.id);
          updateDoc(myUserRef, {
            profilePhoto: downloadURL,
          });

          setSelectedProfileImage(null);
          // profileImgRef.current.value = "";
        });
      }
    );
  };
  const uploadCoverImage = () => {
    // let file = e.target.files[0];

    // setCoverFile(e.target.files[0]);

    const storage = getStorage();

    // Create the file metadata
    const metadata = {
      contentType: selectedCoverImage.type,
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + selectedCoverImage.name);
    const uploadTask = uploadBytesResumable(
      storageRef,
      selectedCoverImage,
      metadata
    );

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const myUserRef = doc(db, "users", userInfo.id);
          updateDoc(myUserRef, {
            coverPhoto: downloadURL,
          });
          setSelectedCoverImage(null);
          // coverImgRef.current.value = "";
        });
      }
    );
  };

  return (
    <>
      <Transition appear show={isEditProfileOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeEditProfileModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white rounded-sm p-4 w-full max-h-[37rem] max-w-xl transform overflow-hidden text-left align-middle shadow-xl transition-all">
                  <form
                    className="flex flex-col gap-8 text-left"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col gap-2">
                      {selectedCoverImage ? (
                        <div className="w-full h-40 rounded-sm overflow-hidden">
                          <img
                            src={URL.createObjectURL(selectedCoverImage)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : userInfo.coverPhoto ? (
                        <div className="w-full h-40 rounded-sm overflow-hidden">
                          <img
                            src={userInfo.coverPhoto}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 bg-gray-300 rounded-sm grid place-items-center">
                          <p className="text-gray-700">
                            You don't have a cover photo to show
                          </p>
                        </div>
                      )}
                      {selectedCoverImage && (
                        <button
                          className="text-accentColor text-3xl cursor-pointer transition-colors duration-300 hover:text-accentColorHover"
                          onClick={removeSelectedCoverImage}
                        >
                          <IoCloseCircleSharp />
                        </button>
                      )}
                      <input
                        className="relative m-0 block w-fit min-w-0 cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                        id="formFileSm"
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        // onChange={uploadPostImage}
                        // ref={imageInputRef}
                        onChange={coverImageChange}
                        ref={coverImgRef}
                      />
                    </div>
                    <div className="flex gap-8 items-center justify-start">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={
                            selectedProfileImage
                              ? URL.createObjectURL(selectedProfileImage)
                              : userPhoto
                          }
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedProfileImage && (
                        <button
                          className="text-accentColor text-3xl cursor-pointer transition-colors duration-300 hover:text-accentColorHover"
                          onClick={removeSelectedProfileImage}
                        >
                          <IoCloseCircleSharp />
                        </button>
                      )}
                      <input
                        className="relative m-0 block w-fit min-w-0 cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                        id="formFileSm"
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        // onChange={uploadPostImage}
                        // ref={imageInputRef}
                        onChange={profileImageChange}
                        ref={profileImgRef}
                      />
                    </div>

                    <div className="self-start flex gap-4 flex-wrap">
                      <input
                        type="text"
                        className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
                        defaultValue={userInfo.firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        type="text"
                        className="p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
                        defaultValue={userInfo.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <input
                        type="email"
                        className="bg-secondBgColor p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
                        defaultValue={userInfo.email}
                        disabled
                      />
                      <input
                        type="text"
                        className="bg-secondBgColor p-2 text-sm rounded outline-none shadow-sm border border-borderColor focus:border-accentColor transition-colors duration-300"
                        defaultValue={userInfo.username}
                        disabled
                      />
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="submit"
                        value="Save"
                        className="p-2 px-4 text-sm bg-accentColor text-textColorLight rounded cursor-pointer hover:bg-accentColorHover transition-colors duration-300"
                      />
                      <input
                        type="button"
                        value="Cancel"
                        className="p-2 px-4 text-sm bg-gray-400 text-textColorLight rounded cursor-pointer hover:bg-accentColorHover transition-colors duration-300"
                        onClick={handleCancelBtn}
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
