

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
  enabled: !!user.email, // Only run the query if user email exists
  refetchOnWindowFocus: false, // Disable refetch on window focus
  keepPreviousData: true, // Keep previous data while fetching new data
});

// Handle search input
const handleSearchChange = (e) => {
  setSearch(e.target.value);
};

// Trigger refetch when the search input changes
const handleSearch = () => {
  refetch(); // Refetch data with updated search parameter
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

  return (
    <div className="text-center pt-20 px-10 pb-20">
      
      <h1 className="text-7xl text-white mb-10">Register Camp</h1>
      <div className='flex bg-[#35485B] w-3/4 mx-auto mb-10 p-1 rounded-xl '>
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
        <Card className="h-full w-full overflow-scroll bg-[#1A202E] text-white">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
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
                        <button className="btn btn-ghost bg-[#007EFF] text-white text-lg hover:border-[#007EFF]">Leave Feedback</button>
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
    </div>
  );
};
export default RegisterCamp;