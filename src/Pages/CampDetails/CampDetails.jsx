import { Link, useLoaderData, useParams } from 'react-router-dom';
import bg from '../../assets/detailsBanner.jpg'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useAuth from '../../Hooks/useAuth';
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTransgenderAlt } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";
import { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import moment from 'moment';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const CampDetails = () => {

const { id } = useParams();
const { axiosPublic } = useAxiosPublic();
const data = useLoaderData();
const { user } = useAuth();

const [participantsCount, setParticipantsCount] = useState(data.participants);

const { name, image, fees, dateTime, location, professional, description } = data;

// Handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  const form = event.target;

  const age = form.age.value;
  const number = form.number.value;
  const gender = form.gender.value;
  const eContact = form.eContact.value;
  const participantName = form.participantName.value;
  const email = form.email.value;
  const date = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(gender);
  // Optionally close the modal after submission
  document.getElementById('my_modal_4').close();

  const registeredCamp = {
    name,
    image,
    fees,
    dateTime,
    location,
    professional,
    description,
    participantName,
    age,
    number,
    gender,
    eContact,
    date,
    email
  };

  try {
    const res = await axiosPublic.post('/registeredCamps', registeredCamp);
    console.log(res.data);

    Swal.fire({
      icon: 'success',
      title: 'Information Submit Successful!',
      text: 'Your Information Successfully Submitted',
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'custom-confirm-button',
        popup: 'custom-popup',
        title: 'custom-title',
        icon: 'custom-icon',
      },
      buttonsStyling: true,
    });

    form.reset();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return true;
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Information Already Exist!',
      text: 'Your Information Already has been added',
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'custom-confirm-button',
        popup: 'custom-popup',
        title: 'custom-title',
        icon: 'custom-icon',
      },
      buttonsStyling: true,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return false; // Return false to indicate the failure
  }
};

// Handle updating participants count
const handleUpdate = async (id) => {
  try {
    const newCount = Number(participantsCount) + 1;
    const res = await axiosPublic.put(`/camps/${id}`, { participantsCount: newCount });
    console.log(res.data);
  } catch (error) {
    console.log('Error updating participants count:', error);
  }
};

// Handle form submit logic
const formSubmit = async (e) => {
  e.preventDefault();

  const isSubmitSuccessful = await handleSubmit(e); // Await handleSubmit result

  if (isSubmitSuccessful) {
    const newCount = participantsCount + 1;
    setParticipantsCount(newCount); // Update participants count only if submission was successful
    await handleUpdate(data._id); // Proceed to update the camp with the new participants count
  }
};

    return (
        <div>
        <div style={{backgroundImage: `url(${bg})`, backgroundSize:'cover', backgroundPosition: 'center'}} className='py-28 relative  object-cover'>
           <div class="absolute inset-0 bg-[#0a1f31] bg-opacity-90 "></div>
    <div class="relative z-10 text-white p-8 flex flex-col justify-center items-center text-center mx-auto">
        
        <h1 class="text-7xl  font-bold">Welcome to {data.name}</h1>
        <p class="mt-4 text-xl">Join us for an enriching experience at our medical camps.</p>
        <p className='flex justify-center items-center gap-1 mt-2'><span className='flex justify-center items-center text-xl text-[#3E8BFF]'><Link to={'/'}>Home </Link></span> <MdKeyboardDoubleArrowRight className='text-2xl' /> <span className="text-xl">{data.name}</span></p>
    </div>

   
        </div>
        {/* Information */}
        <div className='w-10/12 mx-auto py-20'>
        <div className="w-full mx-auto flex gap-10 p-6 items-center rounded-xl ">
  {/* Image Section */}
  <div className="w-5/12">
    <img className="rounded-xl w-full object-cover" src={data.image} alt={data.name} />
  </div>
  {/* Content Section */}
  <div className="flex-1">
    <h1 className="text-5xl font-bold mb-4">{data.name}</h1>
    <div className="text-lg text-gray-700 mb-4">
      <p><span className="font-semibold">Camp Fees:</span> {data.fees}</p>
      <p><span className="font-semibold">Date and Time:</span> {data.dateTime}</p>
      <p><span className="font-semibold">Location:</span> {data.location}</p>
      <p><span className="font-semibold">Healthcare Professional:</span> {data.professional}</p>
      <p><span className="font-semibold">Participant Count:</span> {data.participants}</p>
    </div>
    <p className="text-gray-600 mb-6 text-lg">
      {data.description}
    </p>
    <Link to={user || '/login'}  onClick={user && (()=>document.getElementById('my_modal_4').showModal()) } className="px-6 py-3 bg-blue-500 text-lg text-white rounded-lg hover:bg-blue-600 transition duration-300">
      Join Camp
    </Link>
  </div>
</div>

    </div>

{/* Modal */}

<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-full max-w-5xl bg-[#1E3348]">
    <div className="flex justify-center items-center ">
      <div className="hero-content    p-8 rounded-lg">
        <div className="card w-full">
          <form onSubmit={formSubmit} className="card-body">
            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Camp Name</span>
              </label>
              <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
              <FaBookmark  className='text-[#0495FF]'/>
              {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
              <input
                type="text"
                placeholder="Camp Name"
                name="name"
                defaultValue={data.name}
                readOnly
                className="input focus:outline-none border-none  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Camp Fees</span>
              </label>
              <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
              <ImPriceTag className='text-[#0495FF]' />
              <input
                type="text"
                placeholder="Camp Fees"
                name="fees"
                defaultValue={data.fees}
                readOnly
                className="input focus:outline-none border-none  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Location</span>
              </label>
              <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
              <FaLocationDot   className='text-[#0495FF]'/>
              {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
              <input
                type="text"
                placeholder="Location"
                name="location"
                defaultValue={data.location}
                readOnly
                className="input focus:outline-none border-none  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Healthcare Professional</span>
              </label>
              <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
              <FaUserDoctor  className='text-[#0495FF]' />
              {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
              <input
                type="text"
                placeholder="Healthcare Professional"
                name="professional"
                defaultValue={data.professional}
                readOnly
                className="input focus:outline-none border-none  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Participant Name</span>
              </label>
              <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
              <FaUser  className='text-[#0495FF]'/>
              <input
                type="text"
                placeholder="Participant Name"
                name="participantName"
                defaultValue={user?.displayName}
                readOnly
                className="input focus:outline-none border-none  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
              <MdEmail className='text-[#0495FF]' />
              {/* <p className='text-3xl text-white/30 mx-auto text-center'>|</p> */}
              <input
                type="text"
                placeholder="Email"
                name="email"
                defaultValue={user?.email}
                readOnly
                className="input focus:outline-none border-none  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Your Age</span>
              </label>
              <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
              <FaCalendarAlt  className='text-[#0495FF]'/>
              <input
                type="text"
                placeholder="Age"
                name="age"
               
                className="input focus:outline-none border-none outline-none focus:bg-[#35485B] rounded-full  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Phone Number</span>
              </label>
             
               <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
               <FaPhoneAlt className='text-[#0495FF]' />
              <input
                type="text"
                placeholder="Phone Number"
                name="number"
                className="input focus:outline-none border-none  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Gender</span>
              </label>
             
               <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
               <FaTransgenderAlt className='text-[#0495FF]' />
             <select className='bg-[#35485B]  input focus:outline-none outline-none border-none text-white' name="gender" id="">
              <option selected disabled value="Select Your Gender">Select Your Gender</option>
              <option  value="Male">Male</option>
              <option  value="FeMale">FeMale</option>
              <option  value="Custom">Custom</option>
             </select>
              </div>
            </div>

            <div className="form-control col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text text-white/80 text-lg">Emergency Contact</span>
              </label>
            
               <div className=' flex items-center px-3 bg-[#35485B] rounded-full'>
               <MdContactEmergency className='text-[#0495FF]' />
              <input
               type="text"
               placeholder="Emergency Contact Info"
               name="eContact"
                className="input focus:outline-none border-none  text-white bg-[#35485B]"
                required
              />
              </div>
            </div>

            <div className="form-control mt-6 col-span-2  mx-auto">
              <button className="btn btn-ghost text-white px-16 text-lg w-fit bg-[#0495FF]">Submit</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div className="modal-action">
      <form method="dialog">
        <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>
  </div>
</dialog>



{/* Modal */}
    
        </div>

 

    );
};

export default CampDetails;

