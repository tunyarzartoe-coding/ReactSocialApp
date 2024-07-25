
import { Link } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostItem = ({ post }) => {
  return (
    <div className="posts card mb-4 m-3">
    <article key={post.id}>
      <h3 className="card-header text-white">{post.title}</h3>
      <div className="card-body">
      <p className="excerpt">{post.body.substring(0, 100)}</p>

      <div className="postCredit d-flex justify-content-between mb-2">
      <Link to={`/post/${post.id}`} className="text-white">View Post</Link>
      {/* <PostAuthor post={post} /> */}
      <TimeAgo date={post.date} />
      </div>
      <ReactionButtons post={post} />
      </div>
    </article>
    </div>
  );
};

export default PostItem;
