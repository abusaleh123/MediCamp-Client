import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
const TABLE_HEAD = [

    "Name",
    "Fee",
    "Participants Name",
    "Payment Status",
    "Confirmation Status",
    "Cancel",
    "Feedback",
  ];

const RegisterCamp = () => {
const [camps, setCamps] = useState([]);
const [payments, setPayments] = useState([]);
const{user} = useAuth();
const {axiosSecure} = useAxiosSecure()
    
      useEffect(() => {
        if (user && user.email) {
          axiosSecure.get(`/register?email=${user.email}`)
            .then(res => {
              setCamps(res.data);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }, [user.email, axiosSecure]);


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


      const getPaymentStatus = (campId) => {
        const payment = payments.find(pay => pay.CampId === campId);
        console.log(payment);
        return payment ? "Paid" : "Pay";
      };
    return (
        <div className="text-center pt-20 px-10">
           <h1 className="text-7xl text-white mb-10"> Register Camp</h1>
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
          {camps.map(({ _id, image, name,fees, dateTime,participantName, location, professional }) => {
                 const paymentStatus = getPaymentStatus(_id);
            return (
              <tr key={_id} className='border-t border-dashed border-gray-500'>
                <td className="p-4">
                  <Typography
                    variant="large"
                    color="white"
                    className=" font-normal text-white/80 lg:text-lg text-blue-600"
                  >
                  {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-white/80 text-md text-blue-600"
                  >
                   {fees}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-white/80 lg:text-lg"
                  >
                    {participantName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal  text-white/80 lg:text-lg"
                  >
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
                  <Typography
                    variant="small"
                    className="font-normal text-white/80 lg:text-lg"
                  >
                    Pending
                  </Typography>
                </td>
                <td className="p-4">
                <button onClick={() => handleDelete(_id)} disabled={paymentStatus === 'Paid'} className={`${paymentStatus === 'Paid' ? 'bg-gray-400 p-2 rounded-md' : 'bg-red-600 p-2 rounded-md'}`}><MdDelete  className='text-xl text-white'/></button>
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

export default RegisterCamp;
