import { Link } from 'react-router-dom';
import banner from '../../assets/banner.jpg'
import bannerMain from '../../assets/bannerMain.png'
import heartBeat from '../../assets/heart-beating.png'
import { easeInOut, motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
const Banner = () => {
    return (
        <div className='bg-[#031B33] '>
          <div className='w-11/12 mx-auto  pt-20 '>

         
          <div className='flex items-center  justify-between'>
            <div className='w-2/12 text-start relative right-28 rotate-90 '>
            <h3 className="text-xl text-gray-500 flex ">Follow Us On</h3>
            </div>
          {/* Text */}
            <div className='w-5/12'>
                <p className="text-2xl uppercase text-[#0495FF] mb-6">Wish Your Best Life!</p>
                <h1 className="text-7xl text-white">Protect Your <span className='text-[#DCEAA2]'>Health</span> and Love Be Happy</h1>
                <p className='mt-5 text-white/80 text-xl'>Free medical camp offering health check-ups, consultations, and treatments to ensure better community wellness.</p>


                <Link to={'/availableCamp'} className="btn btn-ghost md:px-6 bg-[#007EFF] hover:bg-[#007EFF] text-white text-lg rounded-full mt-8">Discover More <LuArrowUpRight className='text-xl font-extrabold '/></Link>
                    <p className="text-xl mt-6 text-white font-bold">Since 2024</p>


            </div>
            {/* Image */}
            <div >
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
            className='border absolute z-0  right-40 w-72  h-72 flex justify-center items-center rounded-full bg-[#DBE9A1]'>
            <div className='border w-48 h-48  flex justify-center items-center rounded-full bg-[#031B33]'>

            </div>
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
          
          className='w-24 absolute right-[475px]' src={heartBeat} alt="" />
                <motion.img 
               
                className=' relative' src={bannerMain} alt="" />
            </div>
            {/* Image */}
            </div>
          </div>
        
        </div>
    );
};

export default Banner;