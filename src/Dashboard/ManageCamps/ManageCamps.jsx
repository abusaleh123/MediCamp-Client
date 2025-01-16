import React, { useEffect } from 'react';
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
    const {axiosSecure} = useAxiosSecure();

    const {data : Manage = [], refetch } = useQuery({
        queryKey: 'manage-camps',
        queryFn: async() => {
            const res = await axiosSecure.get('/manage-camps')
      
            return res.data
        }
    })


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
      
// const handleUpdate = (id) => {
//     axiosSecure.put(`/update-camp/${id}`)
//     .then(res => {
//         console.log(res.data);
//        return res.data;
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }



   
    return (
        <div className='w-full px-10 mx-auto text-center'>
          <div>
            <h1 className="text-7xl text-white pt-20 pb-10">Manage Camps </h1>
          </div>
          {/* Camp Table */}
          <div>
          <Card className="h-full w-full overflow-scroll bg-[#1A202E]  text-white ">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
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
          {Manage.map(({ _id, image, name, dateTime, location, professional }) => {
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
 
          </div>
        </div>
    );
};

export default ManageCamps;