import './footer.css';
import Logo from "../../assets/logo2";

const Footer = () => {
    const today = new Date();
    return (
        <footer className="footer">
            <div className="footer__addr">
                <h1 className="footer__logo">
                    <Logo/>
                    Insight
                </h1>
                <h2>Contact</h2>
                <address>
                    123 Main Street, City, Country <br />
                    <a className="footer__btn" href="mailto:contact@example.com">Email Us</a>
                </address>
            </div>
            <ul className="footer__nav">
                <li className="nav__item">
                    <h2 className="nav__title">Categories</h2>
                    <ul className="nav__ul">
                        <li>
                            <a href="#">Technology</a>
                        </li>
                        <li>
                            <a href="#">Travel</a>
                        </li>
                        <li>
                            <a href="#">Food</a>
                        </li>
                        <li>
                            <a href="#">Fashion</a>
                        </li>
                        {/* Add more categories as needed */}
                    </ul>
                </li>

                <li className="nav__item nav__item--extra">
                    <h2 className="nav__title">Resources</h2>
                    <ul className="nav__ul nav__ul--extra">
                        <li>
                            <a href="#">Guides</a>
                        </li>
                        <li>
                            <a href="#">Tutorials</a>
                        </li>
                        <li>
                            <a href="#">Tools</a>
                        </li>
                    </ul>
                </li>

                <li className="nav__item">
                    <h2 className="nav__title">Legal</h2>
                    <ul className="nav__ul">
                        <li>
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#">Terms of Use</a>
                        </li>
                        <li>
                            <a href="#">Disclaimer</a>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="legal">
                <p>&copy; {today.getFullYear()} Insight. All rights reserved.</p>
                <div className="legal__links">
                    <span>Made with <span className="heart">♥</span> </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
