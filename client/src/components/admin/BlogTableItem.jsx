import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function BlogTableItem({ blog, fetchBlogs, index }) {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();
  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        console.log("BlogTableItem: Delete success", data);
        await fetchBlogs();
      } else {
        toast.error(data.message);
        console.log("BlogTableItem: Delete failed (API response)", data);
      }
    } catch (error) {
      console.log("BlogTableItem: Delete error (Exception)", error);
      toast.error(error.message);
    }
  };
  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        console.log("TogglePublish: Success", data);
        await fetchBlogs();
      } else {
        console.log("TogglePublish: Failed response", data);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("TogglePublish: Failed response", data);
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-y border-gray-300 items-center">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toLocaleString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
        ></img>
      </td>
    </tr>
  );
}

export default BlogTableItem;
