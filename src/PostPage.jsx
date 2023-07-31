import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import api from "./api/post"
import { useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext";


const PostPage = () => {
  const { id } = useParams();
  const { posts, setPosts } = useContext(DataContext)
  const post = posts.find((post) => post._id.toString() === id);
  const Navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(
        posts.filter((post) => post._id !== id)
      );
      Navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post._id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              onClick={() => handleDelete(post._id)}
              className="deleteButton"
            >
              Delete Post
            </button>
          </>
        ) : (
          <>
            <h2>Post Not Found</h2>
            <p>Well, thats disappointing</p>
            <p>
              <Link to="/">Visit Our HomePage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
