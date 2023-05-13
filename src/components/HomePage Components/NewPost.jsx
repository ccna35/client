import { IoDocumentsSharp } from "react-icons/io5";
import { db } from "../../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAddPostMutation } from "../../features/api/apiSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const NewPost = ({ userId }) => {
  console.log("NewPost rerendered");
  const [text, setText] = useState("");

  const [addPost, { isLoading, isSuccess, isError, error }] =
    useAddPostMutation();

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const storage = getStorage();

  const uploadPostImage = (e) => {
    let file = e.target.files[0];

    setFile(e.target.files[0]);

    console.log(file);

    // Create the file metadata
    const metadata = {
      contentType: file.type,
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
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
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const addNewPost = () => {
    console.log(userId);
    addPost({ userId, text, image });
    if (isSuccess) {
      setText("");
      setFile(null);
      setImage(null);
    }
    if (isError) console.log(error);
  };

  const deleteImage = () => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, "images/" + file.name);

    // Delete the file
    deleteObject(desertRef)
      .then((data) => {
        // File deleted successfully
        console.log(data);
        setImage("");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        name="post"
        placeholder="What’s on your mind?"
        id=""
        maxLength={280}
        className="border border-borderColor rounded-lg p-4 outline-none focus:border-accentColor transition-colors duration-300"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={uploadPostImage}
      />
      <div className="btns flex gap-8">
        <button
          type="button"
          className="py-2 px-4 text-white rounded-lg bg-accentColor hover:bg-accentColorHover transition-colors duration-300"
          onClick={addNewPost}
        >
          {isLoading ? "Loading..." : "Post"}
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
      {image && (
        <div className="w-full flex gap-4">
          <div className="w-56 overflow-hidden rounded-lg">
            <img src={image} className="w-full object-cover" />
          </div>
          <div
            className="w-8 h-8 rounded-lg bg-blue-400 grid place-items-center hover:bg-slate-400 transition-colors duration-300 cursor-pointer"
            onClick={deleteImage}
          >
            <button className="text-white">X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPost;
