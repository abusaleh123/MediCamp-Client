
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Card, Typography } from "@material-tailwind/react";
import { Helmet } from 'react-helmet';

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
    <div className='px-10 lg:w-10/12 mx-auto pt-20' >
      <Helmet>
        <title>Payment History | MediCamp</title>
      </Helmet>
      <h1 className='text-4xl text-white text-center '>Payment History</h1>
      <p className="md:text-lg mb-10 mt-2 text-center text-white/70">Access your payment history to review past transactions, track payments, and ensure accurate financial records.</p>
      <div className='flex bg-[#35485B] lg:w-1/4 mb-10 p-1 rounded-xl '>
                    <input
                        type="text"
                        placeholder="Search Registered  camps"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered bg-[#35485B] placeholder:text-white text-white w-full focus-border-none md:mb-0"
                    />
                     <button className="btn btn-ghost border-none hover:bg-[#007EFF] bg-[#007EFF] text-white lg:text-lg ">
                        Search
                    </button>
                    </div>
      <Card className="h-full w-full overflow-scroll bg-[#10273D] text-white">
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
