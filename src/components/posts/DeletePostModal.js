import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deletePost } from "./postSlice";
import { toast } from "react-toastify";

const DeletePostModal = ({ post, handleClose,show }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");


  const handleDeletePost = async (event) => {
    event.preventDefault();
      setAddRequestStatus("pending");
      await dispatch(deletePost(post.id)).unwrap();
      navigate("/post/post-table");
      handleClose();
      toast.success("Post deleted successfully!");
    };
    console.log("show==>",show)

  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModal"
    //   aria-hidden="true"
      aria-hidden={!show}

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
              onClick={handleClose()}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeletePost}
              data-bs-dismiss={!show ?"modal":""}
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
