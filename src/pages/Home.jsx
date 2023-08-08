import Feed from "../components/feed";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import loader from '../assets/loader.gif'
import {BsPlugFill} from "react-icons/bs"
import './home.css'

const Home = () => {
  const {searchResults, fetchError, isLoading} = useContext(DataContext);
  return (
    <>
    {
    isLoading ?
    <div className="loader">
        <img src={loader} alt="loader"/>
        <h5>Hold on getting the latest post for you</h5>
    </div>
    :
    fetchError ? 
      <div className="error">
          <BsPlugFill size="3rem"/>
          {`Oops! there was a ${fetchError} :(`}
          <br/>
          Try refreshing the page or try again later.
      </div>
    :
    <main className="Home">
      {
      (searchResults.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p className="noPost">No posts to display</p>
      ))
      }
    </main> 
    }
    </>
  );
};

export default Home;
