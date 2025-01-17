import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import "datatables.net";
import { fetchAllPosts, getPostError, getPostStatus } from "./postSlice";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import AddPostModal from "./AddPostModal";
import Loading from "../../tools/Loading";

const PostTable = () => {
  const dispatch = useDispatch();
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);
  const posts = useSelector(fetchAllPosts);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "success") {
      $("#postTable").DataTable({
        responsive: true,
        columns: [
          { title: "ID", width: "5%" },
          { title: "Title", width: "25%" },
          { title: "Body", width: "50%" },
          { title: "Date", width: "15%" },
          { title: "Action", width: "5%" },
        ],
        destroy: true,
      });
    }
  }, [posts, status]);

  if (status === "loading") {
    return <div><Loading/></div>;
  }

  if (status === "fail") {
    return <div>Error: {error}</div>;
  }

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const openModal = (post) => {
    setShowModal(true);
    setSelectedPost(post);
    // console.log("clicked");
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedPost(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPost(null);
  };

  return (
    <>
      <div className="container text-white post-table mt-1 p-3 table-responsive">
        <div className="d-flex justify-content-between">
          <h4>Post List</h4>
          <button
            className="btn btn-outline-success h-25"
            data-bs-toggle="modal"
            data-bs-target="#addPostModal"
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
        <table id="postTable" className="display text-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>{post.date}</td>
                <td className="d-flex justify-content-end">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="btn btn-outline-primary me-2 h-25"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>{" "}
                  <button
                    onClick={() => openModal(post)}
                    className="btn btn-outline-danger h-25"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <EditPostModal post={selectedPost} handleClose={handleCloseEditModal} />
      )}
      <AddPostModal show={showModal} handleClose={closeModal} />
      <DeletePostModal
        post={selectedPost}
        show={showModal}
        handleClose={closeModal}
      />
    </>
  );
};

export default PostTable;
