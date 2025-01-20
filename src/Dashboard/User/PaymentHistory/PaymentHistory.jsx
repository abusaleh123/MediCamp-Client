
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Name",
  "Fees",
  "Transaction Id",
  "Date & Time",
  "Payment Status",
  "Confirmation",
];

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [search, setSearch] = useState('');
  

  

  useEffect(() => {
    if (user && user.email) {
      axiosSecure.get(`/paymentsByEmail?email=${user.email}&search=${search}`)
        .then(res => {
          setPayments(res.data);
        })
        .catch(error => {
          console.error('Error fetching payments:', error);
        });
    }
  }, [user.email, axiosSecure, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Calculate total pages
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  // Get current page data
  const currentPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='px-10'>
      <h1 className='text-7xl text-white text-center pt-20 mb-10'>History</h1>
      <div className='flex bg-[#35485B] w-3/4 mx-auto mb-10 p-1 rounded-xl '>
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
      <Card className="h-full w-full overflow-scroll bg-[#1A202E] text-white">
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
          <tbody>
            {currentPayments.map(({ _id, name, Fees, date, transactionId, status }) => (
              <tr key={_id} className="border-t border-dashed border-gray-500">
                <td className="p-4">
                  <Typography variant="small" className="font-normal text-white/80 text-md text-blue-600">
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal text-white/80 lg:text-lg">
                    ${Fees}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal text-white/80 w-fit lg:text-lg">
                    {transactionId}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal p-2 rounded-lg text-white/80 lg:text-lg">
                    {date}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal border w-fit p-2 rounded-lg text-white/80 lg:text-lg">
                    Paid
                  </Typography>
                </td>
                <td className="p-4">
                  {status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Pagination Controls */}
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

export default PaymentHistory;
