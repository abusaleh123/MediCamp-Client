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
import { Spinner } from "@material-tailwind/react";
import { Helmet } from 'react-helmet';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCamp = () => {
    const navigate = useNavigate();
    const camp = useLoaderData(); 
    const { _id, name, fees, location, professional, dateTime, participants, description, image } = camp;

    const { register, handleSubmit, reset } = useForm();
    const [previewImage, setPreviewImage] = useState(image);
    const [load, setLoad] = useState(false);

    const handleLoadButton = () => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        }, 4000);
    };

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

            try {
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
            } catch (error) {
                // console.error('Image upload error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while uploading the image.',
                    icon: 'error',
                });
                return;
            }
        }

        data.image = imageUrl;

        try {
            const response = await axiosSecure.put(`/dashboard/update-camp/${_id}`, data);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Camp updated successfully!',
                    icon: 'success',
                });
                navigate('/dashboard/ManageCamp');
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update the camp.',
                    icon: 'error',
                });
            }
        } catch (err) {
            // console.error('Error updating camp:', err);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating the camp.',
                icon: 'error',
            });
        }
    };

    return (
        <div className='w-11/12 mx-auto'>
            <Helmet>
                <title>Update Camp | MediCamp</title>
            </Helmet>
            <div>
                <h1 className='text-4xl text-center pt-20 pb-10 text-white'>Update Camp</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Camp Name</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#10273D] rounded-full'>
                            <FaBookmark className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Camp Name"
                                name="name"
                                {...register("name", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Camp Fees</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#10273D] rounded-full'>
                            <ImPriceTag className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Camp Fees"
                                name="fees"
                                {...register("fees", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Location</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#10273D]  rounded-full'>
                            <FaLocationDot className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Location"
                                name="location"
                                {...register("location", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Healthcare Professional</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#10273D]  rounded-full'>
                            <FaUserDoctor className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Healthcare Professional"
                                name="professional"
                                {...register("professional", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Date & Time</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#10273D] rounded-full'>
                            <FaCalendarAlt className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Date & Time"
                                name="dateTime"
                                {...register("dateTime", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Participants Count</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#10273D]  rounded-full'>
                            <MdOutlineSupervisorAccount className='text-[#0495FF]' />
                            <input
                                type="text"
                                placeholder="Participants Count"
                                name="participants"
                                {...register("participants", { required: true })}
                                className="input focus:outline-none border-none w-full text-white bg-[#10273D]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control col-span-2 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Description</span>
                        </label>
                        <div className='flex items-center px-3 bg-[#10273D] rounded-full'>
                            <MdDescription className='text-[#0495FF]' />
                            <textarea
                                className='focus:outline-none border-none w-full rounded-xl flex items-center px-2 text-white bg-[#10273D]'
                                name="description"
                                {...register("description", { required: true })}
                                cols={10}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center col-span-2">
                        <label className="label">
                            <span className="label-text text-white/80 text-lg">Camp Image</span>
                        </label>
                        <input
                            type="file"
                            name="image"
                            {...register("image")}
                            className="file-input w-full file-input-bordered bg-[#10273D] max-w-xs text-white"
                        />
                        <img className='w-20 h-20 rounded-xl mt-2 object-cover' src={previewImage} alt="Preview" />
                    </div>

                    <div className="form-control mt-6 col-span-2">
                        <button onClick={handleLoadButton} type="submit" className="btn btn-ghost text-white px-16 text-lg w-fit bg-[#0495FF]">
                            {load ? (<Spinner color="blue" />) : ('Update')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateCamp;


