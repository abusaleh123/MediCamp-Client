
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import registerAnimation from '../../assets/Json/Registeer.json';
import bg from '../../assets/Images/19373.jpg';
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Bounce, toast, ToastContainer } from 'react-toastify';
// import registerAnimation from "../../assets/Json/register.json";
import googleIcon from "../../assets/Images/google.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false)
  const { SignInWithEmailPass, setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword)
  }

  const onSubmit = (data) => {
    const { email, password } = data;

    SignInWithEmailPass(email, password)
      .then((result) => {
        setUser(result);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You Are Successfully Logged In",
          confirmButtonText: "Close",
          customClass: {
            confirmButton: "custom-confirm-button",
            popup: "custom-popup",
            title: "custom-title",
            icon: "custom-icon",
          },
          buttonsStyling: true,
        });
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "You failed to login",
          confirmButtonText: "Close",
          customClass: {
            confirmButton: "custom-confirm-button",
            popup: "custom-popup",
            title: "custom-title",
            icon: "custom-icon",
          },
          buttonsStyling: true,
        });
      });
  };

  return (
    <div className="">
      <div className="bg-cover bg-center bg-[#031B33]">
        <div className="gap-20 mx-auto flex justify-center items-center">
          <div style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundSize: 'cover' }} className="min-h-screen flex justify-center items-center w-6/12">
            <Lottie className="w-10/12" animationData={registerAnimation} loop={true} />
          </div>
          <div className="w-6/12 ">
            <div className=" shadow-md rounded-lg p-8  pb-28 backdrop-blur-2xl  bg-white/10 w-5/6">
              <h2 className="md:text-4xl  font-bold text-center py-16 text-white">Login to Medi Camp </h2>
              <form className="w-10/12  mx-auto flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
               
              
                <div className="form-group mb-4 md:w-3/4">
                  <label className="block  font-medium text-gray-400">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="input bg-[#35485B] w-full px-4 py-2 border text-white rounded-md"
                  />
                </div>
                <div className="form-group mb-4 md:w-3/4">
                  <label className="block  font-medium text-gray-400">Password</label>
                  <div>

                  <input
                    type={togglePassword ? 'text' : 'password'}
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className="input w-full px-4 py-2 border bg-[#35485B] text-white rounded-md"
                  />
                  <button onClick={handleTogglePassword} className='text-white absolute right-44 bottom-[235px] '> {togglePassword ? <FaEyeSlash /> : <FaEye />}</button>
                  </div>
                  
                </div>
                <div className="form-group md:w-3/4">
                  <button type="submit" className="btn btn-ghost w-full py-2 px-4 bg-[#007EFF] hover:bg-[#007EFF] text-lg text-white rounded-md">
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <Link to="/register" className=" text-white ">
                  Already have an account? <span className='text-[#007EFF] text-lg hover:underline'>Register</span>
                </Link>
                <div className="border-t mt-6"></div>
                <button  className="mt-10 flex justify-center border w-fit mx-auto py-1 px-6 gap-4 text-white/80 rounded-full items-center">
                  <img className="w-8" src={googleIcon } alt="" />
                  <p className="text-lg">Sign In With Google</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer transition={Bounce} />
    </div>
  );
};

export default Login;
