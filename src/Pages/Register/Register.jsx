import Lottie from 'lottie-react';
import google from '../../assets/Images/google.png';
import registerAnimation from '../../assets/Json/Registeer.json';
import bg from '../../assets/Images/19373.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import moment from 'moment/moment';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import googleIcon from "../../assets/Images/google.png";
import auth from '../../firebase.init';
import { Spinner } from "@material-tailwind/react";
import { Helmet } from 'react-helmet';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false)
  const { signUpWithEmailPass, setUser, profileUpdate, signInWithGoogle, setLoading, loading } = useAuth();
  const { axiosPublic } = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  


  const handleButtonLoading = () => {
    setLoading(true);


    setTimeout(() => {
      setLoading(false)
    },3000)
  }


  const handleTogglePassword = (e) => {
    e.preventDefault()
    setTogglePassword(!togglePassword)
  }

  

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      const res = await axios.post(image_hosting_API, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });

      const imageUrl = res.data.data.url; // Assuming the response provides the URL here
      const { name, email, password } = data;
      const date = moment().format('MMMM Do YYYY, h:mm:ss a');

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
      if (password.length < 6) {
        toast.error('Password should be at least 6 characters');
        return;
      }
      if (!passwordRegex.test(password)) {
        Swal.fire({
          icon: "error",
          title: "Password Validation Error",
          text: "Password should contain at least a capital letter, a special character, and a numeric character",
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'custom-confirm-button',
            popup: 'custom-popup',
            title: 'custom-title',
            icon: 'custom-icon',
          },
          buttonsStyling: true
        });
        return;
      }

      signUpWithEmailPass(email, password)
        .then(result => {
          const newUser = {
            name,
            email,
            photo: imageUrl,
            date,
            creationTime: result.user.metadata.creationTime,
            lastLogin: result.user.metadata.lastSignInTime
          };

          axiosPublic.post('/users', newUser)
            .then(res => {

            })
            .catch(err => {
              
            });

          profileUpdate({ displayName: name, photoURL: imageUrl });
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: "You are successfully registered",
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'custom-confirm-button',
              popup: 'custom-popup',
              title: 'custom-title',
              icon: 'custom-icon',
            },
            buttonsStyling: true
          });

          setUser(result.user);
          navigate('/');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        
    } catch (error) {
      // console.error('Image upload failed:', error);
      toast.error('Image upload failed. Please try again.');
    }
  };

    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
  const handleGoogleSignIn =  () => {
    signInWithGoogle(auth)
    .then((result) => {
    
        const newUser = {
          name: result.user.displayName,
          date,
          photo: result.user.photoURL,
          email: result.user.email,
          lastLogin: result.user.metadata.
          lastLoginAt,
          creationTime: result.user.metadata.
          creationTime,
          
        }
        axiosPublic.post('/users', newUser)
            .then(res => {

            })
          

        
      setUser(result)
      navigate('/')
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    
  }


  return (
    <div className="">
      <Helmet>
        <title>Register | MediCamp</title>
      </Helmet>
      <div className="bg-cover bg-center bg-[#031B33]">
        <div className="gap-20 mx-auto lg:flex justify-center items-center">
          <div style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundSize: 'cover' }} className="md:min-h-screen flex justify-center items-center lg:w-6/12">
            <Lottie className="w-10/12" animationData={registerAnimation} loop={true} />
          </div>
          <div className="lg:w-6/12 ">
            <div className=" shadow-md rounded-lg p-8  py-16 backdrop-blur-2xl  bg-white/10 lg:w-5/6">
              <h2 className="md:text-4xl text-2xl  font-bold text-center py-16 text-white">Register to Medi Camp </h2>
              <form className="w-10/12  mx-auto flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group text-white mb-4 md:w-3/4 w-[250px]">
                  <label className="block  font-medium text-gray-400">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    className="input bg-[#35485B] w-full px-4 py-2 border  rounded-md"
                  />
                </div>
                <div className="form-group mb-4  md:w-3/4 w-[250px]">
                  <label className="block  font-medium text-gray-400 text-md">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: true })}
                    className="input btn file-input-ghost hover:bg-[#35485B] w-full focus:text-white/60 bg-[#35485B] text-white/60 px-4 py-2  font-normal hover:border-none focus:border-none rounded-md"
                  />
                </div>
                <div className="form-group mb-4  md:w-3/4 w-[250px]">
                  <label className="block  font-medium text-gray-400">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="input bg-[#35485B] w-full px-4 py-2 border text-white rounded-md"
                  />
                </div>
                {/* <div className="form-group mb-4 md:w-3/4">
                  <label className="block  font-medium text-gray-400">Password</label>
                  <div>

                  <input
                    type={togglePassword ? 'text' : 'password'}
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className="input w-full px-4 py-2 border bg-[#35485B] text-white rounded-md"
                  />
                  <button onClick={handleTogglePassword} className='text-white absolute md:right-44 right-36 bottom-[285px] '> {togglePassword ? <FaEyeSlash /> : <FaEye />}</button>
                  </div>
                  
                </div> */}



                 <div className="form-group mb-4 md:w-3/4">
                                  <label className="block  font-medium text-gray-400">Password</label>
                                  <div className="rounded-xl flex bg-[#35485B]">
                
                                  <input
                                    type={togglePassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    {...register("password", { required: true })}
                                    className="input w-full px-4   py-2 border bg-[#35485B] text-white rounded-md"
                                  />
                                  <button className="text-white pr-2 abso " onClick={handleTogglePassword} > {togglePassword ? <FaEyeSlash /> : <FaEye />}</button>
                                  </div>
                                  
                                </div>
                <div className="form-group md:w-3/4">
                  <button onClick={handleButtonLoading} type="submit" className="btn btn-ghost w-full py-2 px-4 bg-[#007EFF] hover:bg-[#007EFF] text-lg text-white rounded-md">
                  {
                    loading ? (<Spinner color="blue" />) : (
                      <span>  Register</span>
                    )
                  }
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <Link to="/login" className=" text-white ">
                  Already have an account? <span className='text-[#007EFF] text-lg hover:underline'>Login</span>
                </Link>
                <div className="x-2 mt-4 text-white ">OR</div>
                                <button onClick={handleGoogleSignIn} className="mt-4 flex justify-center border w-fit mx-auto py-1 px-6 gap-4 text-white/80 rounded-full items-center">
                                  <img className="w-8" src={googleIcon } alt="" />
                                  <p className="">Sign Up With Google</p>
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

export default Register;
