import { AiFillLike } from "react-icons/ai";
import { FaCommentDots, FaShareAlt } from "react-icons/fa";

function Post() {
  return (
    <div className="border border-borderColor p-4 rounded-lg bg-white text-textColor flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div className="user-img w-12 h-12 rounded-full relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="./people/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg"
              alt=""
            />
          </div>
          <span className="absolute -top-1 -right-1 block w-4 h-4 rounded-full bg-green-600 border border-white"></span>
        </div>
        <div>
          <div className="user-info flex items-center gap-2">
            <h3 className="text-textColor transition-colors duration-300 text-lg">
              Pat Wills
            </h3>
            <p className="text-secTextColor text-sm">@patwills</p>
          </div>
          <p className="text-secTextColor text-xs">A few seconds ago</p>
        </div>
      </div>
      <p>What a beautiful day, isn’t it?</p>
      <div className="rounded-lg overflow-hidden">
        <img
          src="./post images/demi-deherrera-L-sm1B4L1Ns-unsplash.jpg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="interaction-icons flex gap-8 justify-center">
        <div className="cursor-pointer py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300">
          <AiFillLike className="text-xl" />
          <p className="hidden lg:block">35</p>
        </div>
        <div className="cursor-pointer py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300">
          <FaCommentDots className="text-xl" />
          <p className="hidden lg:block">35</p>
        </div>
        <div className="cursor-pointer py-2 px-4 bg-secondBgColor rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300">
          <FaShareAlt className="text-xl" />
          <p className="hidden lg:block">35</p>
        </div>
      </div>
      <hr />
      <div className="new-comment flex gap-4 items-center">
        <div className="user-img w-10 h-10 rounded-full overflow-hidden">
          <img src="./people/fabio-lucas-32co88SaiN4-unsplash.jpg" alt="" />
        </div>
        <input
          type="text"
          name="newComment"
          placeholder="Write a comment..."
          className=" bg-secondBgColor text-secTextColor rounded-lg text-sm p-2 outline-none flex-grow"
        />
      </div>
      <div className="comment-example grid gap-2 items-start grid-cols-[1fr,2fr,6fr]">
        <div className="user-img w-10 h-10 rounded-full overflow-hidden">
          <img src="./people/fabio-lucas-32co88SaiN4-unsplash.jpg" alt="" />
        </div>
        <h3 className="text-textColor font-medium">Mike Adams</h3>
        <p className="text-textColor text-sm flex-grow">
          Hey buddy, yeah it’s wonderful, today I was at the park with the kids.
        </p>
      </div>
    </div>
  );
}

export default Post;
