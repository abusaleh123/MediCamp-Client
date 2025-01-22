import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import bannerMain from "../../assets/bannerMain.png";
import heartBeat from "../../assets/heart-beating.png";
import { easeInOut, motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
const Banner = () => {
  return (
    <div className="bg-[#031B33] ">
      <div className="w-11/12 mx-auto md:pt-10 pt-6 lg:pt-20 ">
        <div className="md:flex items-center  justify-between">
          <div className="w-2/12 lg:w-3/12 xl:w-2/12 hidden lg:block text-start relative lg:right-20 xl:right-28 rotate-90 ">
            <h3 className="text-xl text-gray-500 flex ">Follow Us On ...</h3>
          </div>
          {/* Text */}
          <div className="lg:w-5/12">
            <p className="md:text-2xl lg:text-xl text-xl uppercase text-[#0495FF] mb-6">
              Wish Your Best Life!
            </p>
            <h1
              className="lg:text-6xl xl:text-7xl text-4xl md:text-5xl
 text-white"
            >
              Protect Your <span className="text-[#DCEAA2]">Health</span> and
              Love Be Happy
            </h1>
            <p className="mt-5 text-white/80  text-sm md:text-lg lg:text-xl">
              Free medical camp offering health check-ups, consultations, and
              treatments to ensure better community wellness.
            </p>

            <Link
              to={"/availableCamp"}
              className="btn btn-ghost md:px-6 bg-[#007EFF] hover:bg-[#007EFF] text-white md:text-lg rounded-full mt-8"
            >
              Discover More{" "}
              <LuArrowUpRight className="text-xl font-extrabold " />
            </Link>
            <p className="lg:text-xl text-lg mt-6 text-white font-bold">Since 2024</p>
          </div>
          {/* Image */}
          <div className="mt-12 md:mt-0 hidden lg:block">
            {/* circle */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{
                y: [0, 40, 0],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="border absolute z-0 right-24 top-[520px] md:top-[190px] md:right-14 xl:top-40  2xl:right-36 xl:right- lg:right-20 xl:w-72 lg:w-60 lg:h-60  xl:h-72 w-28 h-28 flex justify-center items-center rounded-full bg-[#DBE9A1]"
            >
              <div className="border xl:w-48 xl:h-48 lg:w-40 lg:h-40 h-20 w-20  flex justify-center items-center rounded-full bg-[#031B33]"></div>
            </motion.div>
            {/* circle */}
            <motion.img
              initial={{ scale: 1, rotateY: 0 }}
              animate={{ scale: [1, 1, 1], rotateY: [0, 180, 360] }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="xl:w-24 lg:w-16 w-16 absolute right-60 md:right-48 lg:right-[360px] xl:right-[475px]"
              src={heartBeat}
              alt=""
            />
            <motion.img className=" relative" src={bannerMain} alt="" />
          </div>
          {/* Image */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
