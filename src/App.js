import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import PostContainer from "./containers/post/PostContainer";
import SinglePost from "./components/posts/SinglePost";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostContainer />} />
        <Route path="post">
          <Route path=":postId" element={<SinglePost />} />
        </Route>
      </Route>
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
