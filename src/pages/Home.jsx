import Feed from "../components/feed";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import './home.css'

const Home = () => {
  const {searchResults, fetchError, isLoading} = useContext(DataContext);
  return (
    <main className="Home">
      
        {isLoading && <p>Loading the Post .......</p>}
        {!isLoading && fetchError && <p style={{color:"red"}}>{fetchError}</p>}

      { !isLoading && !fetchError &&
          (searchResults.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p className="noPost">No posts to display</p>
      ))}
    </main>
  );
};

export default Home;
