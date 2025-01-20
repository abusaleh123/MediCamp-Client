import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Typography, Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useState } from 'react';

const TABLE_HEAD = [
  "Camp Name",
  "Fee",
  "Participant Email",
  "Payment Status",
  "Confirmation Status",
  "Cancel",
];

const RegisterCamp = () => {
  const { axiosSecure } = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search ,setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

  // Fetch camps data
  const { data: camps = [], refetch } = useQuery({
    queryKey: ['registeredCamps', search],
    queryFn: () => axiosSecure.get('/paymentRegistered', {
      params: { search } // Pass the search term as a query parameter
    }).then(res => res.data),
  });

  // Handle cancellation
  const cancelMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/delete-mRegistered/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['registeredCamps']);
    }
  });

  const handleCancel = (id, paymentStatus, status) => {
    
    cancelMutation.mutate(id);
  };

  const handleConfirm = (id) => {
    axiosSecure.put(`/updateStatus/${id}`, { status: "Confirmed" })
      .then(() => {
        refetch(); // Refetch the updated data to ensure the UI reflects the change
      })
      .catch(error => console.error('Error updating status:', error));
  };




  
const totalPages = Math.ceil(camps.length / itemsPerPage);
const currentRegister = camps.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

// Handle page change
const handlePageChange = (page) => {
  setCurrentPage(page);
};
  return (
    <div className="text-center pt-20 w-10/12 mx-auto px-10">
      <h1 className="text-4xl text-white  mb-10">Registered Camps</h1>
      <div className='flex bg-[#35485B] justify-start  w-1/4  mb-10 p-1 rounded-xl '>
                    <input
                        type="text"
                        placeholder="Search Registered  camps"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered bg-[#35485B] placeholder:text-white text-white w-full focus-border-none  mb-4 md:mb-0"
                    />
                     <button className="btn btn-ghost border-none hover:bg-[#007EFF] bg-[#007EFF] text-white text-lg ">
                        Search
                    </button>
                    </div>

      <Card className="h-full w-full overflow-scroll bg-[#10273D] text-white">
        <table className="w-full min-w-max table-auto text-left">
          <thead >
            <tr className='bg-slate-600'> 
              {TABLE_HEAD.map((head) => (
                <th key={head} className="p-4  pt-10">
                  <Typography
                    variant="large"
                    color="white"
                    className="font-bold leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRegister.map(({ _id, name, Fees,email, participantName, paymentStatus, status }) => (
              <tr key={_id} className="border-t border-dashed border-gray-500">
                <td className="p-4">
                  <Typography variant="large" color="white" className="font-normal text-white/80 lg:text-lg text-blue-600">
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal text-white/80 text-md text-blue-600">
                    {Fees}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal text-white/80 lg:text-lg">
                    {email}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal text-white/80 lg:text-lg">
                   Paid
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal text-white/80 lg:text-lg">
                    {status === "pending" ? (
                      <Button onClick={() => handleConfirm(_id)} className="btn  btn-ghost bg-[#007EFF] text-white">
                        Confirm
                      </Button>
                    ) : (
                      "Confirmed"
                    )}
                  </Typography>
                </td>
                <td className="p-4">
                <button
                    onClick={() => handleCancel(_id, paymentStatus, status)}
                    disabled={status === "Confirmed"} // Disable delete button if status is confirmed
                    className={`text-white flex items-center justify-center p-2 rounded-md ${status === "Confirmed" ? 'bg-gray-400' : 'bg-red-600'}`}
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {
    itemsPerPage === 10 && <>
       <div className="flex justify-center mt-4">
       
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
          >
            {index + 1}
          </button>
        ))}
        
      </div>
    </>
   }
    </div>
  );
};

export default RegisterCamp;
