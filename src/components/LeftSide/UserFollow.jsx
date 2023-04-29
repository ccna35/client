function UserFollow() {
  return (
    <div className="rounded-lg bg-white flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <div className="user-img w-12 h-12 rounded-full overflow-hidden">
          <img src="./people/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg" alt="" />
        </div>
        <div className="user-info flex flex-col">
          <h3 className="text-textColor transition-colors duration-300 text-lg">
            Pat Wills
          </h3>
          <p className="text-secTextColor text-sm">@patwills</p>
        </div>
      </div>
      <button
        type="button"
        className="py-2 px-4 text-white rounded-lg bg-accentColor hover:bg-accentColorHover transition-colors duration-300"
      >
        Follow
      </button>
    </div>
  );
}

export default UserFollow;
