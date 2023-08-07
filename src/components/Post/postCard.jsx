import { Link } from "react-router-dom";
import './postCard.css';

const Post = ({ post }) => {
  //console.log(post)
  return (
    <article className="pst">
      <Link to={`post/${post._id}`}>
        <img src={post.image && post.image != "NA" ? post.image : "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-260nw-1552421075.jpg"} alt="postimage" />
        <h2>{post.title.length <= 35 ? post.title : `${post.title.slice(0, 50)}...`}</h2>
        <h6 className="postdate">{post.datetime}</h6>

        {/* <p className="postBody">
          {post.body.length <= 95 ? post.body : `${post.body.slice(0, 95)}...`}
        </p> */}
      </Link>
    </article>
  );
};

export default Post;
