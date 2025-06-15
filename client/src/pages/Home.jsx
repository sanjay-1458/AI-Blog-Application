import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Bloglist from "../components/Bloglist";
import Newsletter from "../components/Newsletter";
import Login from "../components/admin/Login";

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
