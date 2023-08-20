import './footer.css'
import Logo from "../../assets/logo2"

const Footer = () => {
    const today = new Date();
    return <footer className="Footer">
        <Logo />
        <h1>
            &copy; {today.getFullYear() } quick pens
        </h1>
    </footer>
}

export default Footer