import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { FaTransgenderAlt } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Spinner } from "@material-tailwind/react";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddCamp = () => {
    const { register, handleSubmit , reset} = useForm();
    const {axiosPublic} = useAxiosPublic()
    const {axiosSecure} = useAxiosSecure();
    const [load, setLoad] = useState(false)

   


    const onSubmit = async (data) => {
      setLoad(true); // Set loading to true when the operation starts
  
      try {
          const imageFile = { image: data.image[0] };
          const res = await axiosPublic.post(image_hosting_API, imageFile, {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          });
  
          if (res.data.success) {
              const campData = {
                  name: data.name,
                  image: res.data.data.display_url,
                  participants: parseInt(data.participants),
                  fees: parseInt(data.fees),
                  dateTime: data.dateTime,
                  location: data.location,
                  professional: data.professional,
                  description: data.description,
              };
  
              const campResponse = await axiosSecure.post('/camps', campData);
  
              if (campResponse.data.insertedId) {
                  reset();
                  Swal.fire({
                      icon: 'success',
                      title: 'Camp Submit Successful!',
                      text: 'Your Camp Successfully Submitted',
                      confirmButtonText: 'Close',
                      customClass: {
                          confirmButton: 'custom-confirm-button',
                          popup: 'custom-popup',
                          title: 'custom-title',
                          icon: 'custom-icon',
                      },
                      buttonsStyling: true,
                  });
              }
          }
      } catch (error) {
          console.error("Error submitting the camp:", error);
      } finally {
          setLoad(false); // Set loading to false after the operation completes
      }
  };
    return (
        <div className='w-10/12 mx-auto'>
            <div className='text-4xl text-center pt-20 pb-10'>
                <h1 className=' text-white'> Add Camp</h1>
                <p className="md:text-lg text-sm mt-2 text-white/70">Add your camp to showcase its unique features, activities, and facilities to potential participants</p>
            </div>
             <form onSubmit={handleSubmit(onSubmit)}>
      
       <div className=' grid grid-cols-1 lg:grid-cols-2 gap-6'>
                 <div className="form-control col-span-2 md:col-span-1">
                   <label className="label">
                     <span className="label-text text-white/80 text-lg">Camp Name</span>
                   </label>
                   <div className=' flex items-center px-3 bg-[#10273D]  rounded-full'>
                   <FaBookmark  className='text-[#0495FF]'/>
                   {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
                   <input
                     type="text"
                     placeholder="Camp Name"
                     name="name"
                    //  defaultValue={data.name}
                    {...register("name" , {required: true})} 
                     className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                     required
                   />
                   </div>
                 </div>
                
     
                 <div className="form-control col-span-2 md:col-span-1">
                   <label className="label">
                     <span className="label-text text-white/80 text-lg">Camp Fees</span>
                   </label>
                   <div className=' flex items-center px-3 bg-[#10273D]  rounded-full'>
                   <ImPriceTag className='text-[#0495FF]' />
                   <input
                     type="number"
                     placeholder="Camp Fees"
                     name="fees"
                    //  defaultValue={data.fees}
                    {...register("fees" , {required: true})} 
                     className="input focus:outline-none border-none  w-full   text-white bg-[#10273D]"
                     required
                   />
                   </div>
                 </div>
     
                 <div className="form-control col-span-2 md:col-span-1">
                   <label className="label">
                     <span className="label-text text-white/80 text-lg">Location</span>
                   </label>
                   <div className=' flex items-center px-3 bg-[#10273D] rounded-full'>
                   <FaLocationDot   className='text-[#0495FF]'/>
                   {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
                   <input
                     type="text"
                     placeholder="Location"
                     name="location"
                    //  defaultValue={data.location}
                    {...register("location" , {required: true})} 
                     className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                     required
                   />
                   </div>
                 </div>
     
                 <div className="form-control col-span-2 md:col-span-1">
                   <label className="label">
                     <span className="label-text text-white/80 text-lg">Healthcare Professional</span>
                   </label>
                   <div className=' flex items-center px-3 bg-[#10273D]  rounded-full'>
                   <FaUserDoctor  className='text-[#0495FF]' />
                   {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
                   <input
                     type="text"
                     placeholder="Healthcare Professional"
                     name="professional"
                    //  defaultValue={data.professional}
                    {...register("professional" , {required: true})} 
                     className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                     required
                   />
                   </div>
                 </div>
     
                
     
                 
     
                 <div className="form-control col-span-2 md:col-span-1">
                   <label className="label">
                     <span className="label-text text-white/80 text-lg">Date & Time </span>
                   </label>
                   <div className=' flex items-center px-3 bg-[#10273D]  rounded-full'>
                   <FaCalendarAlt  className='text-[#0495FF]'/>
                   <input
                     type="text"
                     placeholder="Date & Time"
                     name="dateTime"
                     {...register("dateTime" , {required: true})} 
                     className="input focus:outline-none border-none outline-none w-full focus:bg-[#181B23] rounded-full  text-white bg-[#10273D]"
                     required
                   />
                   </div>
                 </div>
     
                 <div className="form-control col-span-2 md:col-span-1">
                   <label className="label">
                     <span className="label-text text-white/80 text-lg">Participants Count</span>
                   </label>
                  
                    <div className=' flex items-center px-3 bg-[#10273D] rounded-full'>
                    <MdOutlineSupervisorAccount className='text-[#0495FF] text-xl' />
                   <input
                     type="text"
                     placeholder="Participants Count"
                     name="number"
                     {...register("participants" , {required: true})} 
                     className="input focus:outline-none border-none w-full  text-white bg-[#10273D]"
                     required
                   />
                   </div>
                 </div>
     
     
                 <div className="form-control col-span-2 md:col-span-2">
                   <label className="label">
                     <span className="label-text text-white/80 text-lg">Description</span>
                   </label>
                 
                   <div className=' flex items-center px-3 bg-[#10273D]  rounded-full'>
                   <MdDescription  className='text-[#0495FF] text-xl'/>
                   <textarea 
                   className='focus:outline-none border-none w-full rounded-full flex items-center px-2  text-white bg-[#10273D]'
                   name="description" 
                   {...register("description", {required: true})} 
                   
                   cols={10}  id=""></textarea>
                   </div>
                 </div>


                 <div className="col-span-2   ">
                   <label className="label">
                     <span className="label-text text-white/80 b text-lg">Camp Image</span>
                   </label>
                   <div className=' rounded-full  '>
                   <input
                     type="file"
                     name="image"
                    //  defaultValue={data.name}
                    {...register("image" , {required: true})} 
                     className="file-input w-full  bg-[#10273D]  lg:max-w-xs   text-white  "
                     required
                   />
                   </div>
                 </div>
     
                 <div className="form-control mt-6 col-span-2  ">
                   <button  className="btn btn-ghost text-white px-16 text-lg w-fit bg-[#0495FF]">{
                        load ? <Spinner color="blue" /> : 'Submit'
                    }</button>
                 </div>
                 </div>
    
    </form>
        </div>
    );
};

export default AddCamp;