import { Link } from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai'
import './postCard.css';

const Post = ({ post }) => {

  return (
    <article className="pst">
      <Link to={`post/${post._id}`}>
        <div className="cardWrapper">
          <img src={post.image && post.image != "NA" ? post.image : "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-260nw-1552421075.jpg"} alt="postimage" />
          <div className="pstText">
            <h2>{post.title.length <= 45 ? post.title : `${post.title.slice(0, 45)}...`}</h2>
            <h6 className="postdate">{post.datetime}</h6>
            <p dangerouslySetInnerHTML={{ __html: post.body.length <= 150 ? post.body : `${post.body.slice(0, 150)}...` }}></p>
          </div>
          <div className="author">
            {
              post.user ? <span className="userBox">
                <img src={post?.user?.photo} alt={"pic"} />
                <span>
                  <p><strong>By {post?.user?.name}</strong></p>
                  <p>{post?.user?.position || "student"}</p>
                </span>
              </span> :
                <span className="userBox">
                  <AiOutlineUser size="1.5rem" />
                  <span>
                    <p><strong>By Unknown Creator</strong></p>
                    <p>--</p>
                  </span>
                </span>
            }
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Post;
