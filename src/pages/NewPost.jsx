import { useState, useContext } from "react";
import axios from "axios";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import api from '../api/post';
import { format } from "date-fns";
// import {Cloudinary} from "@cloudinary/url-gen";

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext)
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [img, setImg] = useState("");

  const Navigate = useNavigate();
  // const cld = new Cloudinary({cloud: {
    //   cloud_name: import.meta.env.VITE_CLOUD_NAME,
    //   api_key: import.meta.env.VITE_API_KEY,
    //   api_secret: import.meta.env.VITE_API_SECRET,
    // }});
    const generateImageUrl = async () => {
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      let data = await generateImageUrl();
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
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
