import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Typography, Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from '../../Hooks/useAxiosSecure';

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

  // Fetch camps data
  const { data: camps = [], refetch } = useQuery({
    queryKey: ['registeredCamps'],
    queryFn: () => axiosSecure.get('/paymentRegistered').then(res => res.data),
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

  return (
    <div className="text-center pt-20 px-10">
      <h1 className="text-7xl text-white mb-10">Registered Camps</h1>
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
            {camps.map(({ _id, name, Fees,email, participantName, paymentStatus, status }) => (
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
                      <Button onClick={() => handleConfirm(_id)} className="bg-yellow-500 text-white">
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
    </div>
  );
};

export default RegisterCamp;
