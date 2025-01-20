import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import { DocumentIcon } from "@heroicons/react/24/solid";
// import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

 
const TABLE_HEAD = [
    "Image",
    "Name",
    "Date & Time",
    "Location",
    "Professional Name",
    "Actions",
  ];

const ManageCamps = () => {
  const [search, setSearch] = useState('')
    const {axiosSecure} = useAxiosSecure();
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;






    const { data: Manage = [], refetch } = useQuery({
      queryKey: ['manage-camps', search], // Dynamic query key
      queryFn: async () => {
          const res = await axiosSecure.get(`/manage-camps`, {
              params: { search: search } // Pass search term as query parameter
          });
          return res.data;
      }
  });

  // Handler for search input change
  // const handleSearchChange = (e) => {
  //     setSearch(e.target.value); // Update search term
  //     refetch(); // Refetch data whenever the search term changes
  // };


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
            axiosSecure
              .delete(`/delete-camp/${id}`)
              .then((res) => {
                if (res.data.deletedCount > 0) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                  refetch(); // To refresh the data after deletion
                } else {
                  Swal.fire({
                    title: "Failed!",
                    text: "Could not delete the camp.",
                    icon: "error",
                  });
                }
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Delete Failed",
                  text: "You failed to delete the camp.",
                  confirmButtonText: 'Close',
                  showCancelButton: false,
                  customClass: {
                    confirmButton: 'custom-confirm-button',
                    popup: 'custom-popup',
                    title: 'custom-title',
                    icon: 'custom-icon',
                  },
                  buttonsStyling: true,
                });
              });
          }
        });
      };
      

const totalPages = Math.ceil(Manage.length / itemsPerPage);
const currentManage = Manage.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

// Handle page change
const handlePageChange = (page) => {
  setCurrentPage(page);
};


   
    return (
        <div className='w-10/12 px-10 mx-auto text-center'>
          <div>
            <h1 className="text-4xl text-white pt-20 pb-10">Manage Camps </h1>
          </div>


          <div className='flex bg-[#35485B] w-1/4  mb-10 p-1 rounded-xl '>
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
          {/* Camp Table */}
          <div>
          <Card className="h-full w-full overflow-scroll bg-[#10273D]  text-white ">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className='bg-slate-600'>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-4 pt-10">
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
        <tbody className=''>
          {currentManage.map(({ _id, image, name, dateTime, location, professional }) => {
            return (
              <tr key={_id} className='border-t border-dashed border-gray-500'>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-bold"
                  >
                   <img className='w-16 h-16 object-cover rounded-full' src={image} alt="" />
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-white/80 text-md text-blue-600"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-white/80 lg:text-lg"
                  >
                    {dateTime}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-white/80 lg:text-lg"
                  >
                    {location}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-white/80 lg:text-lg"
                  >
                    {professional}
                  </Typography>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                <Link to={`/dashboard/update-camp/${_id}`}  className='bg-[#0495FF] p-2 rounded-md '>

                    <MdModeEditOutline className=' text-xl text-white  '/>
                </Link>
                   
                    <button onClick={() => handleDelete(_id)} className="bg-red-600 p-2 rounded-md"><MdDelete  className='text-xl text-white'/></button>
                  </div>
                </td>
              </tr>
            );
          })}
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
        </div>
    );
};

export default ManageCamps;