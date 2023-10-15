import { useState, useContext } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import Editor from "../components/textEditor";
import api from '../api/post';
import { format } from "date-fns";
import './NewPost.css'
import { useAuth0 } from "@auth0/auth0-react";

const NewPost = () => {
  const { posts, setPosts, generateImageUrl } = useContext(DataContext)
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [img, setImg] = useState("");
  const [imgId, setImgId] = useState([]);
  const Navigate = useNavigate();
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } = useAuth0()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    let data = await generateImageUrl(img);
    const token = await getAccessTokenSilently();
    const newPost = { title: postTitle, body: postBody, datetime, ...data, user};
    console.log(newPost)
    try {
      const res = await api.post("/posts", 
      newPost,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      );
      const data = res.data;
      const allPosts = [...posts, { ...newPost, ...data}];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      setImg("");
      Navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return <>
  {
    isAuthenticated ?
    <main className="NewPost">
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="newImage">Header Image:</label>
        <input
          id="postImage"
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="postBody">Post:</label>
        <Editor
          content={postBody}
          setContent={setPostBody}
          setImgId={setImgId}
          imgId={imgId}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
    :
    (loginWithRedirect())()
  }
  </>
};

export default NewPost;
