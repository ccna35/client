import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import useFetchAllUsers from "../../../custom hooks/User/useFetchAllUsers";
import UserFollow from "../../LeftSide/UserFollow";
import { Link } from "react-router-dom";
import SearchInputModal from "../../../Modals/SearchInputModal";
import UserCard from "./UserCard";

const SearchInput = () => {
  const { isLoading, isError, isSuccess, users, errorMsg } = useFetchAllUsers();

  const [showPopup, setShowPopup] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const closeSearchPopup = () => {
    setShowPopup(false);
    setSearchInput("");
  };

  return (
    <div className="relative hidden lg:flex border border-borderColor rounded-lg gap-2 items-center p-2">
      <MdPersonSearch className="text-xl" />
      <input
        type="search"
        name="search"
        placeholder="Find new friends..."
        className="border-none outline-none text-sm"
        onChange={handleSearchInput}
        onFocus={() => setShowPopup(true)}
        autoComplete="off"
        value={searchInput}
      />
      {showPopup && (
        <div className="absolute w-full left-0 top-full z-50 bg-white shadow-md rounded-md p-2 border border-gray-200">
          <div className="flex gap-4 items-center mb-4 justify-between">
            <p>Find new friends</p>
            <AiFillCloseCircle
              onClick={closeSearchPopup}
              className="cursor-pointer text-accentColor"
            />
          </div>
          <div className="flex flex-col gap-3">
            {searchInput.length > 0 ? (
              users
                ?.filter((user) => {
                  return (
                    user.firstName
                      .toLowerCase()
                      .includes(searchInput.toLowerCase()) ||
                    user.lastName
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  );
                })
                .slice(0, 3)
                .map((user) => {
                  return (
                    <Link
                      to={"/user/" + user.id}
                      key={user.id}
                      onClick={closeSearchPopup}
                    >
                      <UserCard user={user} />
                    </Link>
                  );
                })
            ) : (
              <p className="text-gray-500 text-center">
                Start typing to search for other users
              </p>
            )}
          </div>
        </div>
      )}
      {/* <SearchInputModal
        isSearchModalOpen={isSearchModalOpen}
        closeSearchModal={closeSearchModal}
        openSearchModal={openSearchModal}
      /> */}
    </div>
  );
};

export default SearchInput;
