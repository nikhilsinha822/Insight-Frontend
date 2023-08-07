import Header from "./Header/Header";
import SearchBar from "./searchBar/searchBar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router";


const Layout = () => {
  return (
    <div style={{minHeight: "100vh",minWidth: "100vw", display: "flex", flexDirection: "column"}}>
      <Header/>
      <SearchBar />
      <div style={{marginTop: "8rem"}}>
        <Outlet />
      </div> 
      <Footer />
    </div>
  );
};

export default Layout;
