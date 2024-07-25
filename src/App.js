import { Routes,Route } from "react-router";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}

export default App;
