import { createContext, useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});
const TEST_URL="http://192.168.244.84:3500"
const WORK_URL="https://tt-lbu6.onrender.com"

export const DataProvider = ({children}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    `${WORK_URL}/posts`
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        posts,
        fetchError,
        isLoading,
        setPosts,
        searchResults,
      }}
    >
    {children}
    </DataContext.Provider>
  );
};

export default DataContext;
