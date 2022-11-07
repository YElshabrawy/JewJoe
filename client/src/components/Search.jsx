import SearchIcon from './Icons/SearchIcon';

const Search = () => {
    return (
        <div className="relative w-full mt-4 md:hidden">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none w-6 fill-my_darkGray">
                <SearchIcon color="gray" />
            </div>
            <input
                className="w-full bg-my_lightGray placeholder-my_darkGray py-[5px] pl-8 rounded-md text-Bm"
                type="text"
                placeholder="Search"
                name=""
                id=""
            />
        </div>
    );
};

export default Search;
