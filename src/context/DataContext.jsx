import { createContext, useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import axios from "axios"
const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    `${import.meta.env.VITE_BASE_URL}/posts`
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

  const generateImageUrl = async (img) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", (import.meta.env.VITE_PRESET_NAME));
    data.append("cloud_name", (import.meta.env.VITE_CLOUD_NAME));
    data.append("folder", "BlogImages");
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`
      , data);
      let image = await res.data.url;
      let imgId = await res.data.public_id;
      return {image, imgId}
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }


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
        generateImageUrl
      }}
    >
    {children}
    </DataContext.Provider>
  );
};

export default DataContext;
