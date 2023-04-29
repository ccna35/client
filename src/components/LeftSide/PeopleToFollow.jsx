import UserFollow from "./UserFollow";
import UserInfoBox from "./UserInfoBox";

function PeopleToFollow() {
  return (
    <div className="border border-borderColor rounded-lg p-4 bg-white flex flex-col gap-8">
      <h3 className="text-lg text-textColor">People you may follow</h3>
      <div className="flex flex-col gap-8">
        <UserFollow />
        <UserFollow />
        <UserFollow />
        <UserFollow />
        <UserFollow />
        <UserFollow />
        <UserFollow />
      </div>
    </div>
  );
}

export default PeopleToFollow;
