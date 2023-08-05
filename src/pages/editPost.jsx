import { useEffect,useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import api from '../api/post'
import {format} from "date-fns";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { id } = useParams();
  const {posts, setPosts} = useContext(DataContext)
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
    const updatedPost = { _id , title: editTitle, datetime, body: editBody };
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
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post._id)}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Page NOt found</h2>
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
