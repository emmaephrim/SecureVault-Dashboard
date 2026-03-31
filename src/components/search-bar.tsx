import { FaSearch } from "react-icons/fa";

export default function Searchbar({ query, setQuery }: { query: string; setQuery: (e: string) => void }): React.ReactElement {
  return (
    <>
      <div className="relative flex items-center mt-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search files and folders"
          className=" text-body-md text-brand-outline px-4 pl-10 border-brand-inverse-primary border-2 rounded-[10px] bg-transparent w-full h-[45px] focus:border-brand-primary focus:outline-none focus:text-brand-on-surface hover:bg-brand-on-secondary focus:bg-transparent"
        />

        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="h-5 w-5 text-brand-outline" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
