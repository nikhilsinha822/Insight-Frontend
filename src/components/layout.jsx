import Header from "./Header/Header";
// import SearchBar from "./searchBar/searchBar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router";
import Carousel from "./carousel/Carousel";

const Layout = () => {
  return (
    <div style={{minHeight: "100vh",minWidth: "100vw", display: "flex", flexDirection: "column"}}>
      <Header/>
      {/* <SearchBar /> */}
      <Carousel/>
      <div style={{marginTop: "8rem"}}>
        <Outlet />
      </div> 
      <Footer />
    </div>
  );
};

export default Layout;
