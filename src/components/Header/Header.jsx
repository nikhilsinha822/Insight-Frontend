import Logo from '../../assets/logo'
import { Link } from "react-router-dom";
import './header.css'
import { useRef } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import { useAuth0 } from '@auth0/auth0-react';
import useWindowSize from '../../hooks/useWindowSize';

const Header = () => {
    const navRef = useRef();
    const { width, height } = useWindowSize();
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()
    function showNavbar() {
        return navRef.current.classList.toggle("responsive_nav");
    }

    return <header className="Header">
        {width <= height && <Logo />}
        <nav className="Nav" ref={navRef} onClick={showNavbar}>
            {width > height && <Logo />}
            <ul>
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li><Link to="/post">NEW POST</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
            </ul>
            <span>
                {
                    isLoading
                            ?
                            <div style={{ color: "white" }}>Loading.....</div>
                    :
                    !isAuthenticated
                        ?
                        <button style={{ color: "white", fontSize:"1rem" }} onClick={() => loginWithRedirect()}>Login</button>
                            :
                            <>
                                <p style={{ color: "white" }} dangerouslySetInnerHTML={{ __html: user.name }}></p>
                                <button style={{ color: "white" }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
                            </>
                }
            </span>
            <button className="nav-btn nav-close-btn">
                <AiOutlineCloseCircle size="1.5rem" />
            </button>
        </nav>

        <button className="nav-btn nav-open-btn" onClick={showNavbar}>
            <GiHamburgerMenu color="fff" size="1.5rem" />
        </button>

    </header>
}

export default Header