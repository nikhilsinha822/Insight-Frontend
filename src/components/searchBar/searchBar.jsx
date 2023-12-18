import { useContext } from "react";
import DataContext from "../../context/DataContext";
import {BsSearch} from "react-icons/bs"
import './searchBar.css'

const SearchBar = ({searchbarref}) => {
  
  const { search, setSearch } = useContext(DataContext);
  return (
    <form className="searchForm" onSubmit={(evt) => evt.preventDefault()}>
            <label htmlFor="search">Search Post</label>
            <input
                ref={searchbarref}
                type="text"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <BsSearch size="1rem" style={{color:"white"}}/>
    </form>
  );
};

export default SearchBar;
