import { IoDocumentsSharp } from "react-icons/io5";

const NewPost = () => {
  return (
    <div className="flex flex-col gap-4">
      <textarea
        name="post"
        placeholder="What’s on your mind?"
        id=""
        maxLength={280}
        className="border border-borderColor rounded-lg p-4 outline-none"
      />
      <div className="btns flex gap-8">
        <button
          type="button"
          className="py-2 px-4 text-white rounded-lg bg-accentColor hover:bg-accentColorHover transition-colors duration-300"
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
