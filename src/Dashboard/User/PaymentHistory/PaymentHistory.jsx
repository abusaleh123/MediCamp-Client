import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';


 
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
    const {user} = useAuth();
    const {axiosSecure} = useAxiosSecure()
      useEffect(() => {
            if (user && user.email) {
              axiosSecure.get(`/paymentsByEmail?email=${user.email}`)
                .then(res => {
                  setPayments(res.data);
                })
                .catch(error => {
                  console.error(error);
                });
            }
          }, [user.email, axiosSecure]);
        
    return (
        <div>
            History
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
          {payments.map(({ _id, name, Fees,date, transactionId, status }) => {
            return (
              <tr key={_id} className='border-t border-dashed border-gray-500'>
                
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
                   ${Fees}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-white/80  w-fit lg:text-lg"
                  >
                    {transactionId}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal p-2 rounded-lg text-white/80 lg:text-lg"
                  >
            {date}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal border w-fit p-2 rounded-lg text-white/80 lg:text-lg"
                  >
            Paid
                  </Typography>
                </td>
                <td className="p-4">
                  {status}.
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

export default PaymentHistory;