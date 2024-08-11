import React from "react";
import image from "../../assets/images/image.png";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";

const MainPage = () => {
  return (
    <div className="w-full min-h-screen bg-yellow-500">
      {/* Navbar */}
      <div className="w-full h-16 flex justify-between items-center px-4 cursor-pointer">
        <h1 className="text-2xl font-bold text-blue-800">Notes</h1>
        <div className="flex">
          <a className="text-lg text-blue-900" href="#">
            Home
          </a>
          <a className="text-lg text-blue-900 mx-4" href="#">
            Features
          </a>
          <a className="text-lg text-blue-900" href="#">
            FAQs
          </a>
          <a className="text-lg text-blue-900 ml-4" href="#">
            About
          </a>
        </div>
        <div>
          <a
            href="signup"
            className="px-3 py-1 mr-1 border-2 text-blue-900 border-blue-900 rounded-3xl"
          >
            Sign up
          </a>
          <a
            href="/login"
            className="px-3 py-1 text-white bg-blue-900 rounded-3xl"
          >
            Sign in
          </a>
        </div>
      </div>
      {/* Main content */}
      <div className="w-full h-full flex justify-between mt-7">
        <img src={image1} alt="" />
        <div className="text-center">
          <div className="flex justify-start">
            <img src={image} />
          </div>
          <h1 className="text-6xl font-serif font-bold text-blue-900">
            Write your
          </h1>
          <h1 className="text-6xl font-serif font-bold text-blue-900">
            thoughts down
          </h1>
          <h1 className="text-6xl font-serif font-bold text-blue-900">
            as they come to
          </h1>
          <h1 className="text-6xl font-serif font-bold text-blue-900">you.</h1>
          <div className="flex justify-end">
            <img src={image} />
          </div>
          <p className="text-xl text-blue-900 my-6">
          Capture your thoughts and ideas effortlessly, all in one secure place.
          </p>
          <a
            className="px-4 py-2 bg-blue-900 text-white rounded-3xl"
            href="/signup"
          >
            Try Notes, it's FREE!
          </a>
          <h1 className="text-lg text-blue-900 font-bold font-serif mt-16">
            Notes.
          </h1>
        </div>
        <img src={image2} alt="" />
      </div>
    </div>
  );
};

export default MainPage;
