// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaUser } from "react-icons/fa";
// import { FaBookmark } from "react-icons/fa";
// import { ImPriceTag } from "react-icons/im";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaUserDoctor } from "react-icons/fa6";
// import { MdOutlineSupervisorAccount } from "react-icons/md";
// import { FaCalendarAlt } from "react-icons/fa";
// import { MdDescription } from "react-icons/md";
// import { FaTransgenderAlt } from "react-icons/fa";
// import { MdContactEmergency } from "react-icons/md";
// import useAxiosPublic from '../../Hooks/useAxiosPublic';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import Swal from 'sweetalert2';
// import { useLoaderData } from 'react-router-dom';



// const UpdateCamp = () => {
//     const [Camp, setCamp] = useState();
//     const camp = useLoaderData(); // This will load the camp's current data
//     const { _id, name, fees, location, professional, dateTime, participants, description, image } = camp; // Destructure camp data
//     const { register, handleSubmit, reset } = useForm();

//     // Reset the form with camp data
//     useEffect(() => {
//         reset({
//             name,
//             fees,
//             location,
//             professional,
//             dateTime,
//             participants,
//             description,
//             image,
//         });
//     }, [camp, reset]);

//     const { axiosSecure } = useAxiosSecure();

//     const onSubmit = async (data) => {
//         try {
//             const response = await axiosSecure.put(`/dashboard/update-camp/${_id}`, data);
//             if (response.data.modifiedCount > 0) {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: 'Camp updated successfully!',
//                     icon: 'success',
//                 });
//             } else {
//                 Swal.fire({
//                     title: 'Error!',
//                     text: 'Failed to update the camp.',
//                     icon: 'error',
//                 });
//             }
//         } catch (err) {
//             console.error('Error updating camp:', err);
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'An error occurred while updating the camp.',
//                 icon: 'error',
//             });
//         }
//     };

//     return (
//         <div className='w-11/12 mx-auto'>
//             <div>
//                 <h1 className='text-7xl text-center pt-20 pb-10 text-white'> Add Camp</h1>
//             </div>
//              <form onSubmit={handleSubmit(onSubmit)}>
      
//        <div className=' grid grid-cols-1 lg:grid-cols-2 gap-6'>
//                  <div className="form-control col-span-2 md:col-span-1">
//                    <label className="label">
//                      <span className="label-text text-white/80 text-lg">Camp Name</span>
//                    </label>
//                    <div className=' flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
//                    <FaBookmark  className='text-[#0495FF]'/>
//                    {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
//                    <input
//                      type="text"
//                      placeholder="Camp Name"
//                      name="name"
//                     //  defaultValue={data.name}
//                     {...register("name" , {required: true})} 
//                      className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
//                      required
//                    />
//                    </div>
//                  </div>
                
     
//                  <div className="form-control col-span-2 md:col-span-1">
//                    <label className="label">
//                      <span className="label-text text-white/80 text-lg">Camp Fees</span>
//                    </label>
//                    <div className=' flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
//                    <ImPriceTag className='text-[#0495FF]' />
//                    <input
//                      type="text"
//                      placeholder="Camp Fees"
//                      name="fees"
//                     //  defaultValue={data.fees}
//                     {...register("fees" , {required: true})} 
//                      className="input focus:outline-none border-none  w-full   text-white bg-[#181B23]"
//                      required
//                    />
//                    </div>
//                  </div>
     
//                  <div className="form-control col-span-2 md:col-span-1">
//                    <label className="label">
//                      <span className="label-text text-white/80 text-lg">Location</span>
//                    </label>
//                    <div className=' flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
//                    <FaLocationDot   className='text-[#0495FF]'/>
//                    {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
//                    <input
//                      type="text"
//                      placeholder="Location"
//                      name="location"
//                     //  defaultValue={data.location}
//                     {...register("location" , {required: true})} 
//                      className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
//                      required
//                    />
//                    </div>
//                  </div>
     
//                  <div className="form-control col-span-2 md:col-span-1">
//                    <label className="label">
//                      <span className="label-text text-white/80 text-lg">Healthcare Professional</span>
//                    </label>
//                    <div className=' flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
//                    <FaUserDoctor  className='text-[#0495FF]' />
//                    {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
//                    <input
//                      type="text"
//                      placeholder="Healthcare Professional"
//                      name="professional"
//                     //  defaultValue={data.professional}
//                     {...register("professional" , {required: true})} 
//                      className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
//                      required
//                    />
//                    </div>
//                  </div>
     
                
     
                 
     
//                  <div className="form-control col-span-2 md:col-span-1">
//                    <label className="label">
//                      <span className="label-text text-white/80 text-lg">Date & Time </span>
//                    </label>
//                    <div className=' flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
//                    <FaCalendarAlt  className='text-[#0495FF]'/>
//                    <input
//                      type="text"
//                      placeholder="Date & Time"
//                      name="dateTime"
//                      {...register("dateTime" , {required: true})} 
//                      className="input focus:outline-none border-none outline-none w-full focus:bg-[#181B23] rounded-full  text-white bg-[#181B23]"
//                      required
//                    />
//                    </div>
//                  </div>
     
//                  <div className="form-control col-span-2 md:col-span-1">
//                    <label className="label">
//                      <span className="label-text text-white/80 text-lg">Participants Count</span>
//                    </label>
                  
//                     <div className=' flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
//                     <MdOutlineSupervisorAccount className='text-[#0495FF] text-xl' />
//                    <input
//                      type="text"
//                      placeholder="Participants Count"
//                      name="number"
//                      {...register("participants" , {required: true})} 
//                      className="input focus:outline-none border-none w-full  text-white bg-[#181B23]"
//                      required
//                    />
//                    </div>
//                  </div>
     
     
//                  <div className="form-control col-span-2 md:col-span-2">
//                    <label className="label">
//                      <span className="label-text text-white/80 text-lg">Description</span>
//                    </label>
                 
//                    <div className=' flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
//                    <MdDescription  className='text-[#0495FF] text-xl'/>
//                    <textarea 
//                    className='focus:outline-none border-none w-full rounded-full flex items-center px-2  text-white bg-[#181B23]'
//                    name="description" 
//                    {...register("description", {required: true})} 
                   
//                    cols={10}  id=""></textarea>
//                    </div>
//                  </div>


//                  <div className="">
//                    <label className="label">
//                      <span className="label-text text-white/80 b text-lg">Camp Image</span>
//                    </label>
//                    <div className='   '>
//                    {/* <FaBookmark  className='text-[#0495FF]'/> */}
//                    {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
//                    <input
//                      type="file"
//                     //  placeholder="Image"
//                      name="image"
//                     //  defaultValue={data.name}
//                     {...register("image" , {required: true})} 
//                      className="file-input w-full file-input-bordered bg-[#181B23]   max-w-xs text-white  "
//                      required
//                    />
//                    </div>
//                  </div>
     
//                  <div className="form-control mt-6 col-span-2  ">
//                    <button onClick={handleSubmit(() => onSubmit(_id))} className="btn btn-ghost text-white px-16 text-lg w-fit bg-[#0495FF]">Submit</button>
//                  </div>
//                  </div>
    
//     </form>
//         </div>
//     );
// };

// export default UpdateCamp;





import React, { useEffect, useState } from 'react';
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
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCamp = () => {
    const navigate = useNavigate()
    const camp = useLoaderData(); // Load camp data
    const { _id, name, fees, location, professional, dateTime, participants, description, image } = camp;

    const { register, handleSubmit, reset } = useForm();
    const [previewImage, setPreviewImage] = useState(image);

    useEffect(() => {
        if (camp) {
            reset({
                name,
                fees,
                location,
                professional,
                dateTime,
                participants,
                description,
            });
        }
    }, [camp, reset]);

    const { axiosSecure } = useAxiosSecure();

    const onSubmit = async (data) => {
        let imageUrl = previewImage;

        if (data.image && data.image[0]) {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const imageUploadResponse = await fetch(image_hosting_API, {
                method: 'POST',
                body: formData,
            });
            const imageResult = await imageUploadResponse.json();

            if (imageResult.success) {
                imageUrl = imageResult.data.display_url;
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Image upload failed.',
                    icon: 'error',
                });
                return;
            }
        }

        data.image = imageUrl;

        try {
            const response = await axiosSecure.put(`/dashboard/update-camp/${_id}`, data);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Camp updated successfully!',
                    icon: 'success',
                });
                navigate('/dashboard/ManageCamp')
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update the camp.',
                    icon: 'error',
                });
            }
        } catch (err) {
            console.error('Error updating camp:', err);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating the camp.',
                icon: 'error',
            });
        }
    };



    return (
        <div className='w-11/12 mx-auto'>
            <div>
                <h1 className='text-7xl text-center pt-20 pb-10 text-white'> Update Camp</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Camp Name</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
                            <FaBookmark className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Camp Name"
                                name="name"
                                {...register("name", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Camp Fees</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
                            <ImPriceTag className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Camp Fees"
                                name="fees"
                                {...register("fees", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Location</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
                            <FaLocationDot className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Location"
                                name="location"
                                {...register("location", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Healthcare Professional</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
                            <FaUserDoctor className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Healthcare Professional"
                                name="professional"
                                {...register("professional", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Date & Time</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
                            <FaCalendarAlt className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Date & Time"
                                name="dateTime"
                                {...register("dateTime", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Participants Count</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
                            <MdOutlineSupervisorAccount className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Participants Count"
                                name="participants"
                                {...register("participants", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#181B23]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Description</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#181B23] border-b rounded-xl'>
                            <MdDescription className='text-[#0495FF]' />
                            <textarea
                                className='focus:outline-none border-none w-full rounded-xl flex items-center px-2 text-white bg-[#181B23]'
                                name="description"
                                {...register("description", { required: true })}
                                cols={10}
                            />
                        </div>
                    </div>

                    <div className="">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Camp Image</span>
                        </label>
                        <input
                            type="file"
                            name="image"
                            defaultValue={''}
                            {...register("image")}
                            className="file-input w-full file-input-bordered bg-[#181B23] max-w-xs text-white"
                            required
                        />
                    </div>

                    <div className="form-control mt-6 col-span-2">
                        <button type="submit" className="btn btn-ghost text-white px-16 text-lg w-fit bg-[#0495FF]">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateCamp;
