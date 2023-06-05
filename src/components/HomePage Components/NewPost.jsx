import { IoDocumentsSharp, IoCloseCircleSharp } from "react-icons/io5";
import { FaRegSmileBeam } from "react-icons/fa";
import { db } from "../../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Spinner from "../GlobalComponents/Spinner";

const NewPost = ({ userId }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [imageLink, setImageLink] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handling cover photo
  const [selectedPostImage, setSelectedPostImage] = useState(null);

  const postImgRef = useRef();

  // Handles selecting post image.
  const postImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPostImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedPostImage = () => {
    setSelectedPostImage(null);
    postImgRef.current.value = "";
  };

  const storage = getStorage();

  const handleAddingNewPost = () => {
    if (selectedPostImage) {
      setIsLoading(true);
      setProgress(0);

      // Create the file metadata
      const metadata = {
        contentType: selectedPostImage.type,
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + selectedPostImage.name);
      const uploadTask = uploadBytesResumable(
        storageRef,
        selectedPostImage,
        metadata
      );

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progressVar = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressVar);
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
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            submitNewPostToFireBase(downloadURL);
          });
        }
      );
    } else if (text && !selectedPostImage) {
      submitNewPostToFireBase();
    }
  };

  const submitNewPostToFireBase = async (downloadURL = null) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        user: userId,
        text,
        createdAt: serverTimestamp(),
        image: downloadURL,
        comments: [],
        likes: [],
      });
      let msg = "Post added with ID: " + docRef.id;
      setIsLoading(false);
      setText("");
      removeSelectedPostImage();
      return { data: msg };
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="absolute right-4 bottom-4">
          <FaRegSmileBeam
            className="text-orange-500 text-xl"
            onClick={() => {
              setIsVisible(true);
              console.log(isVisible);
            }}
          />
          {isVisible && (
            <Picker
              previewPosition="none"
              data={data}
              onEmojiSelect={(e) => {
                setText((prev) => prev + e.native);
                setIsVisible(false);
              }}
            />
          )}
        </div>

        <textarea
          name="post"
          placeholder="What’s on your mind?"
          id=""
          maxLength={280}
          className="border border-borderColor rounded-lg p-4 outline-none focus:border-accentColor transition-colors duration-300 w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {selectedPostImage && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-700"
            style={{ width: progress + "%" }}
          ></div>
        </div>
      )}

      <input
        className="relative m-0 block w-fit min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
        id="formFileSm"
        type="file"
        accept="image/jpeg, image/png, image/jpg, video/*"
        onChange={postImageChange}
        ref={postImgRef}
      />
      <div className="btns flex gap-8">
        <button
          type="button"
          className="py-2 px-4 text-white rounded-lg bg-accentColor hover:bg-accentColorHover transition-colors duration-300 flex gap-2"
          onClick={handleAddingNewPost}
          disabled={isLoading}
        >
          {isLoading && <p>{progress} %</p>}
          <p>{isLoading ? "Uploading" : "Post"}</p>
        </button>
        <button
          type="button"
          className="py-2 px-4 text-textColor rounded-lg bg-white border border-borderColor hover:bg-gray-100 transition-colors duration-300"
        >
          Save as draft
        </button>
        <div className="flex gap-2 items-center py-2 px-4 text-textColor rounded-lg bg-white border border-borderColor hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
          <IoDocumentsSharp />
          <button type="button">Drafts</button>
        </div>
      </div>
      {selectedPostImage && (
        <div className="w-full flex gap-4">
          <div className="w-56 overflow-hidden rounded-lg">
            {selectedPostImage.type.startsWith("video") ? (
              <video src={URL.createObjectURL(selectedPostImage)} controls />
            ) : (
              <img
                src={URL.createObjectURL(selectedPostImage)}
                className="w-full object-cover"
              />
            )}
          </div>
          <div
            className="grid place-items-center items-start"
            onClick={removeSelectedPostImage}
          >
            <button className="text-accentColor text-3xl cursor-pointer transition-colors duration-300 hover:text-accentColorHover">
              <IoCloseCircleSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPost;
