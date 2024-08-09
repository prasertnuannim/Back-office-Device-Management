import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
type Props = {};

export default function Register({}: Props) {
  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider">
      <div className="w-11/12  sm:w-5/12 md:w-3/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h2 className="text-2xl text-black font-medium">Register</h2>
        </div>
        <form className="my-2">
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Enter Your Name"
            />
            <div className="w-2/12  flex items-center justify-center">
              <FaUser className="text-xl"/>
            </div>
          </div>
      
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Your Email Address"
            />
            <div className="w-2/12  flex items-center justify-center">
              <MdEmail className="text-xl"/>
            </div>
          </div>
   
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="password"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Create a Strong Password"
            />
            <div className="w-2/12  flex items-center justify-center">
              <FaLock className="text-xl"/>
            </div>
          </div>
          <div className="mx-5 my-7 py-2">
            <button className="bg-black w-full h-[35px] text-white">Register</button>
          </div>
          <Link to="/" className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
            <p className="text-sm">Already have an account? / Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
