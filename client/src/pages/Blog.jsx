import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Moment from 'moment'
import { assets, blog_data, comments_data } from "../assets/assets";
import Loader from "../components/Loader";
function Blog() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comment,setComment]=useState([]);
  const fetchBlogData = async () => {
    const currData = blog_data.find((item) => item._id === id);
    console.log(currData);
    setData(currData);
  };
  const addComment=async(e)=>{
    e.preventDefault();
  }
  const fetchCommentData=async()=>{
    setComment(comments_data);
  }
  const [name,setName]=useState('');
  const [content,setContent]=useState('');
  useEffect(() => {
    fetchBlogData();
    fetchCommentData();
  }, []);
  return data ? (
    <div className="relative">
      <img src={assets.gradientBackground} className="absolute -top-50 -z-1 opacity-50" alt="background"/>
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">Published on {Moment(data.createdAt).format('MMMM Do YYYY')} </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">{data.title}</h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block  py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">Anonymous</p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt={data.subTitle} className="rounded-3xl mb-5"/>
        <div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html:data.description}}></div>

        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comment.length})</p>
          <div className="flex flex-col gap-4">
            {
              comment.map((item,index)=>{
                return <div key={index} className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600">
                  <div className="flex items-center gap-2 mb-2">

                  <img src={assets.user_icon} alt="user icon" className="w-6"></img>
                  <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-sm max-w-md ml-8">{item.content}</p>
                  <div className="absolute right-4 bottom-3 items-center gap-2 text-xs">{Moment(item.createdAt).fromNow()}</div>
                </div>
              })
            }
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
            <p className="font-semibold mb-4">Add your comment</p>
            <form onSubmit={addComment} className="flex flex-col items-start gap-4 max-w-lg">
              <input type="text" placeholder="Name" required onChange={(e)=>setName(e.target.value)} value={name} className="w-full p-2 border border-gray-300 rounded outline-none"></input>
              <textarea placeholder="Comment" onChange={(e)=>setContent(e.target.value)} required value={content} className="w-full p-2 border border-gray-300 rounded outline-none h-48"></textarea>
              <button type="submit" className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer">Submit</button>
            </form>
        </div>
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">Share this article on social media</p>
          <div className="flex">
            <img src={assets.facebook_icon} 
            alt="facebook" w={50}/>
            <img src={assets.twitter_icon} alt="twitter" w={50}/>
            <img src={assets.googleplus_icon} alt="googleplus" w={50}/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  ) : (
    <Loader/>
  );
}

export default Blog;
