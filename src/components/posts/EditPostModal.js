import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "./postSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Select from "react-select";
import { fetchAllUsers } from "../users/userSlice";

const EditPostModal = ({ post, handleClose }) => {
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [author, setAuthor] = useState(null);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(fetchAllUsers);

  useEffect(() => {
    if (post?.userId && users.length > 0) {
      const selectedUser = users.find((user) => user.id === post.userId);
      setAuthor({
        value: selectedUser.id,
        label: selectedUser.name,
      });
    }
  }, [post, users]);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (selectedOption) => setAuthor(selectedOption);

  const usersOption = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const canUpdate =
    [title, content, author].every(Boolean) && addRequestStatus === "idle";

  const onPostUpdate = async (event) => {
    event.preventDefault();
    if (canUpdate) {
      try {
        setAddRequestStatus("pending");
        await dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId: author.value,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setAuthor(null);
        handleClose();
        navigate(`/post/post-table`);
        toast.success("Post updated successfully!");
      } catch (error) {
        console.error("Failed to update the post", error);
        toast.error("Failed to update the post!");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show"
        tabIndex="-1"
        aria-labelledby="editPostModal"
        aria-hidden="true"
        style={{ display: "block" }}
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
                Edit Post
              </span>
              <span
                style={{ cursor: "pointer", marginRight: 5 }}
                onClick={handleClose}
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
                  onClick={onPostUpdate}
                  disabled={!canUpdate}
                  className="btn btn-primary"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPostModal;
