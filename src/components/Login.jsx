import React, { useState } from 'react'
import { Router, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

import { FaGoogle } from "react-icons/fa6";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';

const Login = () => {
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState(null);
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate()
   
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `${getBaseUrl()}/api/users/login`,
                data,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const auth = response.data;
              
              if (auth.tokenn) {
                localStorage.setItem('token', auth.tokenn);
                setTimeout(() => {
                  localStorage.removeItem('token')
                  alert('Session Expired, Please Login again')
                  navigate("/")
              }, 3600 * 1000)
              alert("User Logged in!");
              navigate("/");
            }
                 // Redirect to home page after successful registration
              else if (response.status = 401) {
                setEmailError(emailError);
                emailError = "Invalid";
              } else {
                console.log("something went wrong...");        
              }
        } catch (error) {
            setMessage("please Enter a valid email")
            console.error(error.message)
        }
      }

      
    
  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-8 py-10">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login to Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="email">Email</label>
                <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow"
                />
            </div>

            {/* Password Input */}
            <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="password">Password</label>
                <input
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:shadow"
                />
            </div>

            {/* Error Message */}
            {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}

            {/* Login Button */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:shadow"
                >
                    Login
                </button>
            </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
            Don't have an account? <Link to="/api/users/register" className="text-blue-500 hover:text-blue-700 font-semibold">Register</Link>
        </p>

       

        {/* Footer */}
        <p className="mt-8 text-center text-gray-500 text-sm">Birana Book Store</p>
    </div>
</div>

  )
}

export default Login