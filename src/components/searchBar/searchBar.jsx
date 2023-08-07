import { useContext } from "react";
import DataContext from "../../context/DataContext";
import {BsSearch} from "react-icons/bs"
import './searchBar.css'

const SearchBar = () => {
  
  const { search, setSearch } = useContext(DataContext);
  return (
    <form className="searchForm" onSubmit={(evt) => evt.preventDefault()}>
            <label htmlFor="search">Search Post</label>
            <input
                type="text"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <BsSearch size="1rem"/>
    </form>
  );
};

export default SearchBar;
