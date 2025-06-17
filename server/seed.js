// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Blog from "./models/Blog.js";
import Comment from "./models/Comment.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadSeedData() {
  const { blog_data, comments_data } = await import(
    "../client/src/assets/seedAssets.js"
  );
  return { blog_data, comments_data };
}

function convertImageToBase64(filename) {
  const fullPath = path.resolve(__dirname, "../client/src/assets", filename);
  const buffer = fs.readFileSync(fullPath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
}

async function seed() {
  try {
    const { blog_data, comments_data } = await loadSeedData();

    await Blog.deleteMany({});
    await Comment.deleteMany({});
    console.log("🗑 Cleared Blog & Comment collections");

    const blogsToInsert = blog_data.map((b) => ({
      _id: new mongoose.Types.ObjectId(b._id),
      title: b.title,
      subTitle: b.subTitle,
      description: b.description,
      category: b.category,
      image: convertImageToBase64(b.image),
      isPublished: b.isPublished,
      createdAt: new Date(b.createdAt),
      updatedAt: new Date(b.updatedAt),
    }));
    const insertedBlogs = await Blog.insertMany(blogsToInsert);
    console.log(`Inserted ${insertedBlogs.length} blogs`);

    const commentsToInsert = comments_data.map((c) => ({
      _id: new mongoose.Types.ObjectId(c._id),
      blog: new mongoose.Types.ObjectId(c.blog._id),
      name: c.name,
      content: c.content,
      isApproved: c.isApproved,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
    }));
    const insertedComments = await Comment.insertMany(commentsToInsert);
    console.log(`Inserted ${insertedComments.length} comments`);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

(async () => {
  await connectDB();
  await seed();
})();
