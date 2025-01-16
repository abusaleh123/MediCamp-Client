import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";




const AdminProfile = () => {
    const {axiosSecure} = useAxiosSecure()
    const {user} = useAuth();
    const fetchAdminProfile = async (email) => {
        const response = await axiosSecure.get(`/admin-profile?email=${email}`);
        return response.data;
      };
    const { data: profile, error, isLoading, refetch } = useQuery({
        queryKey: ['adminProfile', user?.email],
        queryFn: () => fetchAdminProfile(user.email),
        enabled: !!user?.email, // Only run the query if user.email is defined
      });
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error loading profile</div>;

      
    return (
        <div className="text-white my-20 bg-[#232B3E] rounded-xl  ml-12 py-10 w-8/12">
         <div>
            {
                profile.map((prof) => <div className="flex flex-col items-center" key={prof._id}>


                    <div>
                        <img className="lg:w-52 border-2 p-2 border-blue-500 lg:h-52 w-28 h-28 object-cover rounded-full" src={prof.photo} alt="" />
                    </div>

                    <h1 className="text-2xl mt-6 ">{prof.name}</h1>
                    <div className="flex items-center mt-4 gap-6">

                    <p className="text-gray-400">Email: {prof.email}</p>
                    <p className="text-gray-400">Creation: {prof.creationTime}</p>
                    </div>
                    {/* <p className="text-gray-400">{'Admin'}</p> */}
                    <button className="btn btn-ghost bg-[#0495FF] text-lg mt-8">Update </button>
                </div> )
            }
         </div>
        </div>
    );
};

export default AdminProfile;