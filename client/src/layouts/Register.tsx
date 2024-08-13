import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUser } from "../store/slices/authSlice";
import { RootState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";

interface IFormInput {
  username: string;
  password: string;
  email: string;
}
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { statusRegister } = useSelector((state: RootState) => state.auth);
  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { username, password, email } = data;
    dispatch(registerUser({ username, password, email }));
  };

  useEffect(() => {
    if (statusRegister === "success") {
      navigate("/");
    }
  }, [statusRegister]);

  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider  bg-gradient-to-t from-gray-700 to-gray-300">
      <div className="glass shadow-2xl sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-full text-center my-3">
          <h2 className="text-2xl text-black font-medium">Register</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="my-2">
          <div className="flex border-b-black border-b-2 mx-5 py-1">
            <input
              type="text"
              {...register("username")}
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Enter Your Name"
            />
            <div className="w-2/12  flex items-center justify-center">
              <FaUser className="text-xl" />
            </div>
          </div>
          {errors.username && (
            <p className="text-red-500 mx-5">{errors.username.message}</p>
          )}

          <div className="flex border-b-black border-b-2 mx-5 mt-5 py-1">
            <input
              type="text"
              {...register("email")}
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Your Email Address"
            />
            <div className="w-2/12  flex items-center justify-center">
              <MdEmail className="text-xl" />
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 mx-5">{errors.email.message}</p>
          )}

          <div className="flex border-b-black border-b-2 mx-5 mt-5 py-1">
            <input
              type="password"
              {...register("password")}
              className="w-11/12 bg-transparent outline-none placeholder-black"
              placeholder="Create a Strong Password"
            />
            <div className="w-2/12  flex items-center justify-center">
              <FaLock className="text-xl" />
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 mx-5">{errors.password.message}</p>
          )}

          <div className="mx-5 my-7 py-2">
            <button className="bg-black w-full h-[35px] text-white">
              Register
            </button>

            {statusRegister === "failed" && (
              <p className="flex items-center justify-center rounded-md bg-red-700  font-medium text-white p-2 mt-2">
                something went wrong
              </p>
            )}

            {statusRegister === "loading" && (
              <p className="flex items-center justify-center rounded-md bg-green-700  font-medium text-white p-2 mt-2">
                Loading...
              </p>
            )}
          </div>

          <div className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
            <p className="text-sm" onClick={() => navigate("/")}>
              Already have an account? / Login
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
