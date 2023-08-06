import Header from "./Header/Header";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router";


const Layout = () => {
  return (
    <div style={{"minHeight": "100vh", "display": "flex", "flexDirection": "column"}}>
      <Header/>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
