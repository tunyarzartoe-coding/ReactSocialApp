import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { deletePost } from "./postSlice";
import { toast, ToastContainer } from "react-toastify";

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
            <button
              className="btn btn-outline-success h-25"
              data-bs-toggle="modal"
              data-bs-target="#addPostModal"
            >
              <i class="bi bi-plus"></i>{" "}
            </button>
          </div>
          <div className="card-body">
            <p className="excerpt">{post.body.substring(0, 100)}</p>
            <div className="postCredit d-flex justify-content-between mb-2">
              <Link to={`/post/${post.id}`} className="text-white">
                View Post
              </Link>
              {/* <PostAuthor post={post} /> */}
              <TimeAgo date={post.date} />
            </div>
            <div className="d-flex justify-content-between">
              <ReactionButtons post={post} />
              <button
                className="btn btn-outline-danger h-25"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
      {/* Delete Modal */}
      <div
        className="modal fade "
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content delete-modal">
            <div className="modal-body text-center mt-2">
              <p>Are you sure you want to delete this post?</p>
            </div>
            <div className="text-end  modal-footer " style={{ borderTop: 0 }}>
              <button
                type="button"
                className="btn btn-secondary "
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeletePost}
                data-bs-dismiss="modal"
                disabled={addRequestStatus === "pending"}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
