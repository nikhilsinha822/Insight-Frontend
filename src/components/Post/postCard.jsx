import { Link } from "react-router-dom";
import './postCard.css';

const Post = ({ post }) => {

  return (
    <article className="pst">
      <Link to={`post/${post._id}`}>
        <img src={post.image && post.image != "NA" ? post.image : "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-260nw-1552421075.jpg"} alt="postimage" />
        <div className="pstText">
          <h2>{post.title.length <= 100 ? post.title : `${post.title.slice(0, 100)}...`}</h2>
          <h6 className="postdate">{post.datetime}</h6>
        </div>
      </Link>
    </article>
  );
};

export default Post;
