import Logo from '../../assets/logo'
import { Link } from "react-router-dom";
import './header.css'
import { useRef } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
// import { FaRegUserCircle } from "react-icons/fa"

const Header = () => {
    const navRef = useRef();

    function showNavbar() {
        return navRef.current.classList.toggle("responsive_nav");
    }

    return <header className="Header">
        <Logo />
        <nav className="Nav" ref={navRef} onClick={showNavbar}>
            <ul>
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li><Link to="/post">NEW POST</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
            </ul>
            <button className="nav-btn nav-close-btn">
                <AiOutlineCloseCircle />
            </button>
        </nav>

        <button className="nav-btn nav-open-btn" onClick={showNavbar}>
            <GiHamburgerMenu color="fff"/>
        </button>
        {/* <span>
            <FaRegUserCircle size="30px" />
            <h6>Login</h6>
        </span> */}
    </header>
}

export default Header