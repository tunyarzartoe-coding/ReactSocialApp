import { Routes,Route } from "react-router";
import Layout from "./layout/Layout";
import PostContainer from "./containers/post/PostContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<PostContainer />} />
      </Route>
    </Routes>
  );
}

export default App;
