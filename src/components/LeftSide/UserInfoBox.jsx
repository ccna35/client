function UserInfoBox() {
  return (
    <div className="border border-borderColor rounded-lg p-4 bg-white flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <div className="user-img w-12 h-12 rounded-full overflow-hidden">
          <img src="./people/fabio-lucas-32co88SaiN4-unsplash.jpg" alt="" />
        </div>
        <div className="user-info flex flex-col">
          <h3 className="text-accentColor hover:text-accentColorHover transition-colors duration-300 text-lg">
            Mike Adams
          </h3>
          <p className="text-secTextColor text-sm">@mikeadams</p>
        </div>
      </div>
      <div className="follow-group flex gap-8 items-center">
        <p>5 Followers</p>
        <p>23 Following</p>
      </div>
    </div>
  );
}

export default UserInfoBox;
