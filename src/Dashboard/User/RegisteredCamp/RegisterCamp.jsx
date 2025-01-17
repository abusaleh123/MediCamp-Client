import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import { MdModeEditOutline } from "react-icons/md";
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

const RegisterCamp = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  // Fetch camps data
  const { data: camps = [], refetch } = useQuery({
    queryKey: ['camps', user.email],
    queryFn: () => axiosSecure.get(`/register?email=${user.email}`).then(res => res.data),
    enabled: !!user.email, // Only run the query if user email exists
  });

  // Fetch payments data
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
            });
          });
      }
    });
  };

  return (
    <div className="text-center pt-20 px-10">
      <h1 className="text-7xl text-white mb-10">Register Camp</h1>

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
              {camps.map(({ _id, name, fees, participantName, status, dateTime }) => {
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
                        {confirmationStatus === "Pending" ? (
                          <p>Pending</p>
                        ) : (
                          confirmationStatus
                        )}
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
      </div>
    </div>
  );
};

export default RegisterCamp;
