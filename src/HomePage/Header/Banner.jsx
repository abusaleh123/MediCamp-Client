import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import educationLottie from "../../assets/Json/Education.json";
import bg from "../../assets/Images/bannerbg.jpg";
import { easeInOut, motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import Lottie from "lottie-react";
const Banner = () => {
  return (
    <div style={{backgroundImage: `url(${bg})` , backgroundSize: 'cover', backgroundPosition: 'center'}}  >
      <div className="w-10/12 mx-auto md:pt-10 pt-6 lg:pt-20 ">
        <div className="md:flex items-center  justify-between">
          <div className="w-/12 lg:w-3/12 xl:w-2/12 hidden lg:block text-start relative lg:right-20 xl:right-28 rotate-90 ">
            <h3 className="text-xl text-gray-500 flex ">Contact Us On ...</h3>
          </div>
          {/* Text */}
          <div className="lg:w-6/12">
            <p className="md:text-2xl lg:text-xl text-xl uppercase text-[#0495FF] mb-6">
            গুছিয়ে পড়লে a+ নিশ্চিত!
            </p>
            <h1
              className="lg:text-6xl font-bold leading-loose  xl:text-6xl text-4xl md:text-5xl
 text-red-500"
            >
              গ্রাম কিংবা শহর,<span className="text-sky-400 leading-10">সবার</span>  জন্য শিক্ষা হোক সহজ থেকে সহজতর...
            </h1>
            <p className="mt-5 text-gray-500  text-sm md:text-lg lg:text-xl">
            SSC ও দাখিল প্রস্তুতি হোক বাংলাদেশ মাদরাসা এডুকেশন <span className="text-red-500">(BME)</span> এর অনলাইন কিংবা অফলাইন সেবায়...
            </p>

            <Link
              to={"/availableCamp"}
              className="btn btn-ghost md:px-6 bg-[#007EFF] hover:bg-[#007EFF] text-white md:text-lg rounded-full mt-8"
            >
              Discover More{" "}
              <LuArrowUpRight className="text-xl font-extrabold " />
            </Link>
            <p className="lg:text-xl text-lg mt-6 text-gray-700 font-bold">Since 2023</p>
          </div>
          {/* Image */}
          <Lottie className="" animationData={educationLottie} loop={true} />
          {/* Image */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
