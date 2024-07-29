import React from "react";
import { useSelector } from "react-redux";
import { getPostStatus, getPostError, fetchAllPosts } from "./postSlice";
import PostItem from "./PostItem";
import Loading from "../../tools/Loading";

const PostLists = () => {
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);
  const posts = useSelector(fetchAllPosts);

  let content;

  if (status === "loading") {
    content = <Loading/>;
  } else if (status === "success") {
    const orderedPostByDate = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPostByDate.map((post) => {
      return <PostItem post={post} />;
    });
  } else if (status === "fail") {
    content = <p>{error}</p>;
    console.log(error);
  }
  return content;
};

export default PostLists;
