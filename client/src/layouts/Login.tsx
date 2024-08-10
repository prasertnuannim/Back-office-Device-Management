import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";

interface IFormInput {
  username: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { username, password } = data;
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider">
      <div className="w-11/12 sm:w-5/12 md:w-3/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h2 className="text-2xl text-black font-medium">Login</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="my-2">
          <div className="flex border-b-black border-b-2 mx-5  py-1">
            <input
              type="text"
              {...register("username")}
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Enter Your Name"
            />
            <div className="w-2/12 flex items-center justify-center">
              <FaUser className="text-xl" />
            </div>
          </div>
          {errors.username && (
            <p className="text-white mx-5">{errors.username.message}</p>
          )}


          <div className="flex border-b-black border-b-2 mx-5 mt-5 py-1">
            <input
              type="password"
              {...register("password")}
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Enter Your Password"
            />
            <div className="w-2/12 flex items-center justify-center">
              <FaLock className="text-xl" />
            </div>
          </div>
          {errors.password && (
            <p className="text-white mx-5">{errors.password.message}</p>
          )}

          <div className="mx-5 flex items-center justify-end cursor-pointer tracking-wider text-xs">
            <p>forgot password</p>
          </div>
          <div className="mx-5 my-7 py-2">
            <button
              type="submit"
              className="bg-black w-full h-[35px] text-white"
            >
              Login
            </button>
            {status === "failed" && (
              <p className="flex items-center justify-center rounded-md bg-red-500  font-medium text-white p-2 mt-2">
                something went wrong
              </p>
            )}
          </div>
          <Link
            to="/register"
            className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer"
          >
            <p className="text-sm">Don't have an account? / Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
