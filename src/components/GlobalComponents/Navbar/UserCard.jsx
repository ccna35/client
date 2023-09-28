const UserCard = ({ user }) => {
  return (
    <div className="p-1 rounded-lg bg-white flex items-center justify-between gap-2 transition-colors duration-300 hover:bg-orange-100">
      <div className="flex gap-4 items-center">
        <div className="user-img w-8 h-8 rounded-full overflow-hidden">
          <img src={user.profilePhoto || "../profile/userPhoto.png"} />
        </div>
        <div className="user-info flex flex-col">
          <h3 className="text-textColor text-sm font-medium  cursor-pointer">
            {user.firstName + " " + user.lastName}
          </h3>
          <p className="text-secTextColor text-sm">@{user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
