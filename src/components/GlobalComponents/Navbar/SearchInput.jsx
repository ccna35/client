import { MdPersonSearch } from "react-icons/md";

const SearchInput = () => {
  const handleSearchInput = () => {};
  return (
    <div className="hidden lg:flex border border-borderColor rounded-lg gap-2 items-center p-2">
      <MdPersonSearch className="text-xl" />
      <input
        type="search"
        name="search"
        placeholder="Find new friends..."
        className="border-none outline-none text-sm"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
