import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import api from "../api/post"
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import { MdDeleteOutline } from "react-icons/md";
import { HiPencil } from "react-icons/hi"
import "./post.css"

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
          <div className="postContainer">
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <Link to={`/edit/${post._id}`}>
              <button className="editButton">
                <HiPencil size="1.7rem" />
              </button>
            </Link>
            <button
              onClick={() => handleDelete(post._id)}
              className="deleteButton"
            >
              <MdDeleteOutline size="1.7rem" />
            </button>
            <img src={post.image && post.image!="NA" ?  post.image : "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-260nw-1552421075.jpg"} alt="postimage"/>  
            <p className="postBody" dangerouslySetInnerHTML={{__html: post.body}} />
          </div>
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
