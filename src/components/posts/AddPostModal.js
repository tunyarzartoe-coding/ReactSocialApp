import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchAllUsers } from "../users/userSlice";
import { addNewPost } from "./postSlice";
import Select from "react-select";

const AddPostModal = ({ show, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(null); // Updated to be an object for react-select
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(fetchAllUsers);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      dispatch(fetchAllUsers());
    }
  }, [show, dispatch]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
  };
  const onAuthorChange = (selectedOption) => {
    setAuthor(selectedOption);
  };

  const usersOption = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const canCreate = [title, content, author].every(Boolean);

  const onCancelClick = () => {
    handleClose();
    setTitle("");
    setContent("");
    setAuthor(null); 
  };

  const onPostCreate = (event) => {
    event.preventDefault();
    console.log("hello clicked");
    if (canCreate) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewPost({
            title,
            body: content,
            userId: author.value, 
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setAuthor(null);

        navigate("/");
      } catch (error) {
        console.error("failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addPostModal"
        tabIndex="-1"
        aria-labelledby="addPostModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md rounded">
          <div
            className="modal-content"
            style={{
              background: "linear-gradient(65deg,#101841,#202b60)",
              color: "#c6c6c6",
            }}
          >
            <div
              className="modal-header px-2 p-2"
              style={{
                background: "linear-gradient(65deg,#101841,#202b60)",
                color: "#c6c6c6",
                border: "none",
                padding: 6,
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  color: "#fff",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  marginLeft: 2,
                }}
              >
                Add New Post
              </span>
              <span
                style={{ cursor: "pointer", marginRight: 5 }}
                data-bs-dismiss="modal"
                onClick={onCancelClick}
              >
                <i className="bi bi-x-lg" />
              </span>
            </div>

            <div
              className="modal-body"
              style={{ background: "linear-gradient(65deg,#101841,#202b60)" }}
            >
              <div className="d-flex flex-column justify-content-center">
                <div className="row pb-3">
                  <div className="col-3 d-flex justify-content-between align-items-center">
                    <span className="text-nowrap text-start ">Post Title</span>
                    <span>:</span>
                  </div>
                  <div className="col-9">
                    <span className="w-100">
                      <input
                        type="text"
                        id="postTitle"
                        value={title}
                        onChange={onTitleChange}
                        className="form-control"
                      />
                    </span>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-3 d-flex justify-content-between">
                    <span className=" text-start ">Post Content</span>
                    <span>:</span>
                  </div>
                  <div className="col-9">
                    <span className="w-100">
                      <textarea
                        id="postContent"
                        value={content}
                        onChange={onContentChange}
                        className="form-control"
                      />
                    </span>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-3 d-flex justify-content-between">
                    <span className=" text-start ">Author</span>
                    <span>:</span>
                  </div>
                  <div className="col-9">
                    <span className="w-100">
                      <Select
                        className="w-100"
                        id="postAuthor"
                        value={author}
                        onChange={onAuthorChange}
                        options={usersOption}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-end">
                <button
                  onClick={onPostCreate}
                  disabled={!canCreate}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={onCancelClick}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;
