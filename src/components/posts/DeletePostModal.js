import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deletePost } from "./postSlice";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const DeletePostModal = ({ post, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const modalRef = useRef(null);

  useEffect(() => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();

    return () => {
      modal.hide();
    };
  }, []);

  const handleDeletePost = async (event) => {
    event.preventDefault();
    try {
      setAddRequestStatus("pending");
      await dispatch(deletePost(post.id)).unwrap();
      navigate("/post/post-table");
      toast.success("Post deleted successfully!");
      handleClose();
    } catch (error) {
      console.error("Failed to delete the post", error);
      toast.error("Failed to delete the post!");
    } finally {
      setAddRequestStatus("idle");
    }
  };

  return (
    <div
      className="modal fade show"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModal"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content delete-modal">
          <div className="modal-body text-center mt-2">
            <p>Are you sure you want to delete this post?</p>
          </div>
          <div className="text-end modal-footer" style={{ borderTop: 0 }}>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeletePost}
              disabled={addRequestStatus === "pending"}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
