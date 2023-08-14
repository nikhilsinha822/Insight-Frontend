import { useState, useContext } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import Editor from "../components/textEditor";
import api from '../api/post';
import { format } from "date-fns";

const NewPost = () => {
  const { posts, setPosts, generateImageUrl } = useContext(DataContext)
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [img, setImg] = useState("");
  const Navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      let data = await generateImageUrl(img);
      const newPost = { title: postTitle, body: postBody, datetime, ...data };
      try {
        const res = await api.post("/posts", newPost);
        const _id = res.data.id;
        const allPosts = [...posts, { ...newPost, _id }];
        setPosts(allPosts);
        setPostTitle("");
        setPostBody("");
        setImg("");
        Navigate("/");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    
    return (
    
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
        <label htmlFor="newImage">Image:</label>
        <input
          id="postImage"
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="postBody">Post:</label>
        <Editor
          content={postBody}
          setContent={setPostBody}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
