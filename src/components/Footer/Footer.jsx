import './footer.css'
import Logo from "../../assets/logo2"
import Logo3 from '../../assets/logo3';

const Footer = () => {
    const today = new Date();
    return <footer className="Footer">
        <Logo />
        <h1>
            &copy; {today.getFullYear() } quick pens
        </h1>
        <Logo3 />
    </footer>
}

export default Footer