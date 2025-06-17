import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import Comment from "./pages/admin/Comment";
import ListBlog from "./pages/admin/ListBlog";
import Layout from "./pages/admin/Layout";
import Login from "./components/admin/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

function App() {

  const {token}=useAppContext()
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="addBlog" element={<AddBlog></AddBlog>}></Route>
          <Route path="comment" element={<Comment />}></Route>
          <Route path="listblog" element={<ListBlog />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
