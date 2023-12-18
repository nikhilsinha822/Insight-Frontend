import Home from "./pages/Home";
import { useRef, useState } from "react";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/Post";
import Missing from "./pages/Missing";
import { Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import Layout from "./components/layout";
import EditPost from "./pages/editPost";
import { DataProvider } from "./context/DataContext";

function App() {
  const searchbarref = useRef(null)
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout searchbarref={searchbarref}/>}>
          <Route index element={<Home searchbarref={searchbarref}/>} />
          <Route path="post">
            <Route index element={<NewPost/>} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
