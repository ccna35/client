import { useEffect, useState } from "react";
import UserFollow from "./UserFollow";
import UserInfoBox from "./UserInfoBox";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Spinner from "../GlobalComponents/Spinner";

function PeopleToFollow() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      const usersArray = [];
      querySnapshot.forEach((doc) => {
        usersArray.push({ id: doc.id, ...doc.data() });
      });
      setUsers([...usersArray]);
      setIsLoading(false);
    });

    // return () => {
    //   second
    // }
  }, []);

  return (
    <div className="border border-borderColor rounded-lg p-4 bg-white flex flex-col gap-8">
      <h3 className="text-lg text-textColor">People you may follow</h3>
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <Spinner />
        ) : users.length === 0 ? (
          <div className="grid place-items-center p-4 border rounded-lg bg-white">
            There are no users to follow :(
          </div>
        ) : (
          users.map((user) => {
            return <UserFollow key={user?.id} user={user} />;
          })
        )}
      </div>
    </div>
  );
}

export default PeopleToFollow;
