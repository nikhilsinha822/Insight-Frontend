import { useEffect,useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import api from '../api/post'
import {format} from "date-fns";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import Editor from "../components/textEditor";
import './editPost.css'

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [imageData, setImageData] = useState("");
  const { id } = useParams();
  const {posts, setPosts, generateImageUrl} = useContext(DataContext)
  const post = posts.find((post) => post._id.toString() === id);
  const Navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (_id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    let data="";
    if(imageData){
       data = await generateImageUrl(imageData);
    }
    const updatedPost = { _id , title: editTitle, datetime, body: editBody, ...data};
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post._id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      Navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <main>
      {editTitle ? (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            {
              post.image && <img src={post.image} alt="postimage"/>  
            }
            <label htmlFor="postImage">Note:- Uploading new image will replace the old image</label>
            <input
              id="postImage"
              type="file"
              onChange={(e)=> setImageData(e.target.files[0])}
            />
            <label htmlFor="postBody">Post:</label>
            <Editor
              content={editBody}
              setContent={setEditBody}
            />
            <button type="submit" onClick={() => handleEdit(post._id)}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Page Not found</h2>
          <p>Well thats dispointing</p>
          <p>
            <Link to="/">Visit our HomePage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
