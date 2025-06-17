import fs from "fs";
import imagekit from "../config/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../config/gemini.js";
export const addBlog = async (req, res) => {
  try {
    console.log(req.body.blog);
    if (!req.body.blog) {
      return res
        .status(400)
        .json({ success: false, message: "Blog data not found in request" });
    }

    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });
    // Optimize the image
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });
    const image = optimizedImageUrl;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res.status(200).json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.status(501).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById( blogId );
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.deleteMany({blog:id});
    await Blog.findByIdAndDelete(id);
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message:"Blog Status Updated"});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




export const addComment=async(req,res)=>{
  try {
    const {blog,name,content}=req.body;
    await Comment.create({blog,name,content});
    res.json({success:true,message:"Comment added for review"})
  } catch (error) {
     res.json({ success: false, message: error.message });
  }
}
export const getBlogComment=async(req,res)=>{
  try {
    const { blogId } = req.body;
    const comments=await Comment.find({blog:blogId,isApproved:true}).sort({createdAt:-1});
    res.json({success:true,comments})
  } catch (error) {
     res.json({ success: false, message: error.message });
  }
}

export const generateContent=async(req,res)=>{
  try {
    const {prompt}=req.body;
    const content=await main('Generate a blog content for this topic in simple text format, only add content and no additional data:'+prompt);
    res.json({success:true,content});
  } catch (error) {
    res.json({success:false,message:error.message});
  }
}