function UserFollow({ user }) {
  const userPhoto = user.profilePhoto || "../profile/userPhoto.png";

  return (
    <div className="rounded-lg bg-white flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <div className="user-img w-12 h-12 rounded-full overflow-hidden">
          <img src={userPhoto} />
        </div>
        <div className="user-info flex flex-col">
          <h3 className="text-textColor transition-colors duration-300 text-lg">
            {user.firstName + " " + user.lastName}
          </h3>
          <p className="text-secTextColor text-sm">@{user.username}</p>
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
