import Header from "./Header/Header";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router";


const Layout = () => {
  return (
    <>
      <Header/>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
