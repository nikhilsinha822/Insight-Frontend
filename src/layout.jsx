import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";


const Layout = () => {
  return (
    <>
      <Header title="React.js Blog"/>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
