import { useContext } from "react";
import DataContext from "../../context/DataContext";
import Logo from '../../assets/logo'
import {BsSearch} from "react-icons/bs"
import './header.css'

const Header = () => {
    const { search, setSearch } = useContext(DataContext);
    return <header className="Header">
        <Logo />
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
    </header>
}

export default Header