"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isFilled =
      user.username.trim() && user.email.trim() && user.password.trim();

    setButtonDisabled(!isFilled);
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setUser(prev => ({...prev, [field]: value}));
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      await axios.post("/api/user/singup", user);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: unknown) {
      toast.error("Invalid email or password");
      console.log("Login Error →", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-linear-to-r from-blue-100 via-white to-purple-100 px-4'>
      <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className='w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 rounded-2xl p-8'
      >
        <h1 className='text-3xl font-bold text-center mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          {loading ? "Creating Account..." : "Create Account"}
        </h1>

        {/* Username */}
        <motion.div
          initial={{opacity: 0, x: -20}}
          animate={{opacity: 1, x: 0}}
          transition={{delay: 0.1}}
        >
          <label className='text-gray-700 font-medium'>Username</label>
          <input
            type='text'
            placeholder='Enter username'
            className='w-full mt-2 px-4 py-3 text-black rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            value={user.username}
            onChange={e => handleChange("username", e.target.value)}
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{opacity: 0, x: -20}}
          animate={{opacity: 1, x: 0}}
          transition={{delay: 0.2}}
          className='mt-4'
        >
          <label className='text-gray-700 font-medium'>Email</label>
          <input
            type='email'
            placeholder='Enter email'
            className='w-full mt-2 px-4 py-3 text-black rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            value={user.email}
            onChange={e => handleChange("email", e.target.value)}
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{opacity: 0, x: -20}}
          animate={{opacity: 1, x: 0}}
          transition={{delay: 0.3}}
          className='mt-4'
        >
          <label className='text-gray-700 font-medium'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            className='w-full mt-2 px-4 py-3 text-black rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            value={user.password}
            onChange={e => handleChange("password", e.target.value)}
          />
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{scale: 0.95}}
          animate={{scale: 1}}
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.97}}
          disabled={buttonDisabled || loading}
          onClick={onSignup}
          className={`w-full mt-6 py-3 rounded-xl text-white font-semibold shadow-lg 
            transition ${
              buttonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90"
            }`}
        >
          {loading ? "Please wait..." : "Sign Up"}
        </motion.button>

        <p className='text-center text-gray-600 mt-4'>
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className='text-blue-600 hover:underline cursor-pointer'
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
