import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { RiDoubleQuotesR } from "react-icons/ri";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { LuMoveLeft } from "react-icons/lu";
import { easeInOut, motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import { FaCheck, FaHeartPulse } from "react-icons/fa6";
import image from '../../assets/Images/campImg1-min.jpg'
import image2 from '../../assets/Images/CampImg2-min.jpg'
import image3 from '../../assets/Images/campImg3-min.jpg'
import image4 from '../../assets/Images/campImg4-min.jpg'
import image5 from '../../assets/Images/campImg5-min.jpg'



export default function Provide() {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className='bg-[#031B33] py-28'>

    <div className="w-10/12 mx-auto flex flex-row-reverse gap-10"> {/* Center the content */}
      <div className=' mx-auto '>
      <div className='text-center md:text-start'>
      <div className='flex justify-center md:justify-start'>
      <div className='flex items-center gap-2 text-xl text-center justify-center lg:justify-start '>
                    <motion.p
                    initial={{ scale: 1, rotateY: 0 }}
                    animate={{ scale: [1, 1, 1], rotateY: [0, 180, 360] }}
                    transition={{
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className='w-fit '
                    ><FaHeartPulse className='text-blue-600' /> </motion.p>
                    <p className="text-blue-600 text-center"> Why Choose Us</p>
                </div>
      </div>
         <div className='w-fit  md:justify-start mb-4 md:mb-0'>
         <h1 className=" text-white text-3xl  font-bold mt-2 w-4/6 leading-tight">Empowering Your Health
         Specialized Service</h1>
         <p className="border-t my-10 border-gray-500"></p>
         <div className="space-y-2 mb-6 text-white/70">
         <div className='flex gap-4 items-center'>
                         <FaCheck className='text-white text-xl bg-blue-500 rounded-full p-1' />
                         <p className="text-lg ">Providing Compassionate Care</p>
                         </div>
         <div className='flex gap-4 items-center'>
                         <FaCheck className='text-white text-xl bg-blue-500 rounded-full p-1' />
                         <p className="text-lg">Brings Innovation and Care Together</p>
                         </div>
         <div className='flex gap-4 items-center'>
                         <FaCheck className='text-white text-xl bg-blue-500 rounded-full p-1' />
                         <p className="text-lg">From Prevention to Recovery</p>
                         </div>
         </div>
         </div>
      </div>


      <div className=""> {/* Custom nav container */}
        <button
          onClick={goPrev}
          className="border-2 w-fit h-fit hover:bg-[#048DF1] text-white font-bold py-2 px-2 rounded-full  mr-2"
        >
       <LuMoveLeft className='text-2xl ' />


        </button>
        <button
          onClick={goNext}
          className="border-2 w-fit h-fit hover:bg-[#048DF1] text-white font-bold py-2 px-2 rounded-full"
        >
        <MdOutlineArrowRightAlt  className='text-2xl'/>

        </button>
      </div>
    </div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        className="mySwiper w-8/12"
      >
        {/* ... your SwiperSlides ... */}
        <SwiperSlide>
              
              <img className='rounded-xl' src={image} alt="" />


        </SwiperSlide>
        
        <SwiperSlide>
              
              <img className='rounded-xl' src={image3} alt="" />


        </SwiperSlide>
        <SwiperSlide>
              
              <img className='rounded-xl' src={image4} alt="" />


        </SwiperSlide>
        <SwiperSlide>
              
              <img className='rounded-xl' src={image5} alt="" />


        </SwiperSlide>
       
      
        
       
       
      </Swiper>
    </div>
    </div>
  );
}