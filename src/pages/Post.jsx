import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import api from "../api/post"
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import { MdDeleteOutline } from "react-icons/md";
import { HiPencil } from "react-icons/hi"
import DOMpurify from 'dompurify'
import './post.css'
import { useAuth0 } from '@auth0/auth0-react'

const PostPage = () => {
  const {getAccessTokenSilently} = useAuth0()
  const { user, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const { posts, setPosts } = useContext(DataContext)
  const post = posts.find((post) => post._id.toString() === id);
  const Navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await api.delete(`/posts/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setPosts(
        posts.filter((post) => post._id !== id)
      );
      Navigate("/");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <div className="postContainer">
            <h2>{post.title}</h2>
            <div className="author">
              <img src={post?.user?.photo} />
              <p>{post?.user?.name}</p>
              <p><em>{post?.user?.email}</em></p>
            </div>
            <p className="postDate">{post.datetime}</p>
            {
              isAuthenticated && user?.sub?.split('|')[1] === post?.user?.sub &&
              <>
                <Link to={`/edit/${post._id}`}>
                  <button className="editButton">
                    <HiPencil style={{color:"white"}} size="1.7rem" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="deleteButton"
                >
                  <MdDeleteOutline style={{color:"white"}} size="1.7rem" />
                </button>
              </>}
            <img className="headerImg" src={post.image && post.image != "NA" ? post.image : "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-260nw-1552421075.jpg"} alt="postimage" />
            <div className="postBody sun-editor-editable" dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(post.body, { ADD_TAGS: ['iframe'] }) }} />
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
