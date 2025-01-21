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

import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Card, Typography } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const TABLE_HEAD = [
  "Name",
  "Fee",
  "Participants Name",
  "Payment Status",
  "Confirmation Status",
  "Cancel",
  "Feedback",
];

const itemsPerPage = 10; 

const RegisterCamp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [search, setSearch] = useState('');
  
const { data: camps = [], refetch } = useQuery({
  queryKey: ['camps', user.email, search],
  queryFn: () => axiosSecure.get(`/register?email=${user.email}&search=${search}`).then(res => res.data),
  enabled: !!user.email,
  refetchOnWindowFocus: false, 
  keepPreviousData: true, 
});

// Handle search input
const handleSearchChange = (e) => {
  setSearch(e.target.value);
};

const handleSearch = () => {
  refetch();
};









  useEffect(() => {
    if (user && user.email) {
      axiosSecure.get(`/paymentsByEmail?email=${user.email}`)
        .then(res => setPayments(res.data))
        .catch(error => console.error(error));
    }
  }, [user.email, axiosSecure]);

  const getPaymentStatus = (campId) => {
    const payment = payments.find(pay => pay.CampId === campId);
    return payment ? "Paid" : "Pay";
  };

  const getConfirmationStatus = (campId) => {
    const payment = payments.find(pay => pay.CampId === campId);
    return payment ? payment.status : "Pending";
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-register/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              refetch();
            } else {
              Swal.fire("Failed!", "Could not delete the camp.", "error");
            }
          })
          .catch(() => Swal.fire("Delete Failed", "You failed to delete the camp.", "error"));
      }
    });
  };

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = camps.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(camps.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);



  const handleFeedback = (e) => {
    e.preventDefault()

  }

  return (
    <div className="text-center w-10/12 mx-auto pt-20 px-10 pb-20">
      
      <h1 className="text-4xl text-white ">Registered Camps</h1>
      <p className="text-lg mb-10 mt-2 text-white/70">View and manage all your registered camps, track participants, and update camp information seamlessly.</p>
      <div className='flex bg-[#35485B] w-1/4   mb-10 p-1 rounded-xl '>
                    <input
                        type="text"
                        placeholder="Search Registered  camps"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered bg-[#35485B] placeholder:text-white text-white w-full focus-border-none  mb-4 md:mb-0"
                    />
                     <button onClick={handleSearch} className="btn btn-ghost border-none hover:bg-[#007EFF] bg-[#007EFF] text-white text-lg ">
                        Search
                    </button>
                    </div>
      {/* Camp Table */}
      <div>
        <Card className="h-full  mx-auto overflow-scroll bg-[#10273D] text-white">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="bg-slate-600">
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="p-4 pt-10">
                    <Typography variant="large" color="white" className="font-bold leading-none">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map(({ _id, name, fees, participantName }) => {
                const paymentStatus = getPaymentStatus(_id);
                const confirmationStatus = getConfirmationStatus(_id);
                return (
                  <tr key={_id} className="border-t border-dashed border-gray-500">
                    <td className="p-4">
                      <Typography variant="large" color="white" className="font-normal text-white/80 lg:text-lg text-blue-600">
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" className="font-normal text-white/80 text-md text-blue-600">
                        {fees}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" className="font-normal text-white/80 lg:text-lg">
                        {participantName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" className="font-normal text-white/80 lg:text-lg">
                        {paymentStatus === "Paid" ? (
                          <button className="btn btn-ghost border border-green-400">Paid</button>
                        ) : (
                          <Link to={`/dashboard/registerById/${_id}`}>
                            <button className="btn btn-ghost border border-blue-400">Pay</button>
                          </Link>
                        )}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" className="font-normal text-white/80 lg:text-lg">
                        {confirmationStatus === "Pending" ? "Pending" : confirmationStatus}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(_id)}
                        disabled={paymentStatus === 'Paid'}
                        className={`${paymentStatus === 'Paid' ? 'bg-gray-400 p-2 rounded-md' : 'bg-red-600 p-2 rounded-md'}`}
                      >
                        <MdDelete className='text-xl text-white'/>
                      </button>
                    </td>
                    <td className="p-4">
                      {confirmationStatus === "Confirmed" && (
                        <button onClick={(()=>document.getElementById('my_modal_4').showModal())} className="btn btn-ghost bg-[#007EFF] text-white text-lg hover:border-[#007EFF]">Leave Feedback</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>


      
          <div className="mt-4 text-white">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, camps.length)} of {camps.length}
        </div>
          <div className="flex justify-center mt-4">
        
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 rounded mx-1 ${currentPage === index + 1 ? 'bg-[#007EFF] text-white' : 'bg-[#04478a] text-white'}`}
            >
              {index + 1}
            </button>
          ))}
       
        </div>
     
      </div>

      
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-full max-w-5xl bg-[#1E3348]">
          <div className="flex justify-center items-center ">
            <div className="hero-content    p-8 rounded-lg">
              <div className="card w-full">
                <form onSubmit={handleFeedback} className="card-body">
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
    </div>
  );
};
export default RegisterCamp;