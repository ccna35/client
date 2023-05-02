import { IoDocumentsSharp } from "react-icons/io5";
import { db } from "../../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const NewPost = ({ userId }) => {
  console.log("NewPost rerendered");
  const [text, setText] = useState("");

  const addNewPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        user: userId,
        text,
        createdAt: serverTimestamp(),
        image: null,
        comments: [],
      });
      console.log("Document written with ID: ", docRef.id);
      setText("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <textarea
        name="post"
        placeholder="What’s on your mind?"
        id=""
        maxLength={280}
        className="border border-borderColor rounded-lg p-4 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="btns flex gap-8">
        <button
          type="button"
          className="py-2 px-4 text-white rounded-lg bg-accentColor hover:bg-accentColorHover transition-colors duration-300"
          onClick={addNewPost}
        >
          Post
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
    </div>
  );
};

export default NewPost;
