import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import "datatables.net";
import { fetchAllPosts, getPostError, getPostStatus } from "./postSlice";

const PostTable = () => {
  const dispatch = useDispatch();
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);
  const posts = useSelector(fetchAllPosts);

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
          { title: "ID", width: "0%" },
          { title: "Title", width: "25%" },
          { title: "Body", width: "50%" },
          { title: "Date", width: "15%" },
          { title: "Action", width: "10%" },
        ],
        destroy: true,
      });
    }
  }, [posts, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "fail") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container text-white user-table mt-1 p-3 table-responsive">
      <h4>Post List</h4>
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
              <td className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-success h-25"
                  data-bs-toggle="modal"
                  data-bs-target="#addPostModal"
                >
                  <i class="bi bi-plus"></i>{" "}
                </button>
                <button
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
  );
};

export default PostTable;
