import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
type Props = {};

export default function Login({}: Props) {
  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider">
      <div className="w-11/12  sm:w-5/12 md:w-3/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h2 className="text-2xl text-black font-medium">Login</h2>
        </div>
        <form className="my-2">
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Enter Your Name"
            />
            <div className="w-2/12  flex items-center justify-center">
              <FaUser className="text-xl" />
            </div>
          </div>

          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="password"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Enter Your Password"
            />
            <div className="w-2/12  flex items-center justify-center">
              <FaLock className="text-xl" />
            </div>
          </div>

          <div className="mx-5 flex items-center justify-end cursor-pointer tracking-wider text-xs">
            <p>forgot password</p>
          </div>
          <div className="mx-5 my-7 py-2">
            <button className="bg-black w-full h-[35px] text-white">
              Login
            </button>
          </div>
          <Link  to="/register" className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
            <p className="text-sm">Don't have an account ? / Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
