import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useCamps from "../../../Hooks/useCamps";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import useAuth from "../../../Hooks/useAuth";
// ..
AOS.init();
const MedicalCamps = () => {
  const {theme} = useAuth()
const [camps, setCamps] = useState([]);
const {axiosPublic} = useAxiosPublic()
// console.log(axiosPublic);
const{data: campsss = []} = useQuery({
  queryKey: ['campss'],
  queryFn: async() => {
    const res = await axiosPublic.get('/campss')
    return res.data
  }
})



  return (
    <div className={`${theme === 'dark' ? ' bg-slate-100 ' : ' bg-black text-white'}`}>
    <section className="py-14 w-11/12 mx-auto  ">
      <h2 className="lg:text-7xl text-4xl md:text-5xl
 font-semibold text-center ">Popular Medical Camps</h2>
      <p className={`lg:text-lg text-sm md:text-md text-center  ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} mb-6 mt-1`}>Explore top-rated medical camps offering specialized care, expert consultations, and health services to improve community well-being.</p>
      <div className={`grid ${theme === 'dark' ? 'bg-white' : 'bg-black'} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
        {campsss.map((camp, index) => (
          <div   key={index} className={` ${theme === 'dark' ? 'bg-[#ECF7FF]' : 'bg-gray-950 text-white'} p-6 rounded-lg shadow-lg `}>
            <div 
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000">
            <img src={camp.image} alt={camp.name} className="w-full h-96  object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-bold  mb-2">{camp.name}</h3>
            <div className="flex justify-between items-center">
            <p className=" mb-1"><strong>Fees:</strong> {camp.fees}</p>
            <p className="text-gray-600 mb-1"><strong></strong> {camp.dateTime}</p>
            </div>
          <div className="flex justify-between items-center">
          <p className="text-gray-600 mb-1"><strong>Location:</strong> {camp.location}</p>
          <p className="text-gray-600"><strong>Participants:</strong> {camp.participants}</p>
          </div>
        
            <p className="text-gray-600 "><strong>Healthcare Professional:</strong> {camp.professional}</p>
             <Link to={`/camp-details/${camp._id} `} className="btn btn-ghost md:px-6 bg-[#007EFF] hover:bg-[#007EFF] text-white mt-4 text-lg rounded-xl ">See Details </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to={'/availableCamp'} className="px-6 py-3 text-lg text-white rounded-full bg-[#007EFF] hover:bg-[#007EFF] transition duration-300">
          See All Camps
        </Link>
      </div>
    </section>
    </div>
  );
};

export default MedicalCamps;
