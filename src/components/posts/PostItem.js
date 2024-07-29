import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { deletePost } from "./postSlice";
import { toast, ToastContainer } from "react-toastify";
import PostAuthor from "../users/PostAuthor";

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const handleDeletePost = async (event) => {
    event.preventDefault();
    try {
      setAddRequestStatus("pending");
      await dispatch(deletePost(post.id)).unwrap();
      navigate("/");
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the post", error);
      toast.error("Failed to delete the post!");
    } finally {
      setAddRequestStatus("idle");
    }
  };

  return (
    <>
      <div className="posts card mb-4 m-3">
        <article key={post.id}>
          <div className="card-header d-flex justify-content-between">
            <h3 className="text-white">{post.title}</h3>
          </div>
          <div className="card-body">
            <p className="excerpt">{post.body.substring(0, 100)}</p>
            <div className="postCredit d-flex justify-content-between mb-2">
              <Link to={`/post/${post.id}`} className="text-white">
                View Post
              </Link>
              <PostAuthor post={post} />
              <TimeAgo date={post.date} />
            </div>
            <ReactionButtons post={post} />
          </div>
        </article>
      </div>
    </>
  );
};

export default PostItem;
