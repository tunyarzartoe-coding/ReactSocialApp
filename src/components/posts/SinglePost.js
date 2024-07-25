import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPostById } from "./postSlice";
// import PostAuthor from "../users/PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

const SinglePost = () => {
  const { postId } = useParams();

  const post = useSelector((state) => getPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post Not Found!</h2>
      </section>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="posts card m-3" style={{ maxWidth: "500px" }}>
        <article key={post.id}>
          <h3 className="card-header text-white">{post.title}</h3>
          <div className="card-body">
            <p className="excerpt">{post.body.substring(0, 100)}</p>

            <div className="postCredit d-flex justify-content-between mb-2">
              <Link to={`/post/edit/${post.id}`} className="text-white">
                Edit Post
              </Link>
              {/* <PostAuthor post={post} /> */}
              <TimeAgo date={post.date} />
            </div>
            <ReactionButtons post={post} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default SinglePost;
