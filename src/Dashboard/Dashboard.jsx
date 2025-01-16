
import { NavLink, Outlet } from "react-router-dom";
import { IoMdAnalytics } from "react-icons/io";
import './././../index.css'
// import '../Dashboard/Analylics/dashboard.css'
import { CgProfile } from "react-icons/cg";
import { TbCampfireFilled } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  //? TODO : get isAdmin value from the database
const [isAdmin] = useAdmin()
const {axiosSecure} = useAxiosSecure()
const {user} = useAuth();
const fetchAdminProfile = async (email) => {
    const response = await axiosSecure.get(`/profilePublic?email=${email}`);
    // refetch()
    return response.data;
  };
const { data: profile, error, isLoading, refetch } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: () => fetchAdminProfile(user.email),
    enabled: !!user?.email, // Only run the query if user.email is defined
  });

  refetch()
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="lg:flex bg-[#1A202E]">
 
      {/* Dashboard side bar */}
      <div className="w-96 min-h-screen  shadow-2xl shadow-[#383F52] pt-10  bg-[#1A202E] text-center ">
        <div className=" flex justify-center">
          {
            profile.map(prof => <div key={prof._id}>
              <img className="lg:w-52 border-2 p-2 border-blue-500 lg:h-52 w-28 h-28 object-cover rounded-full" src={prof.photo} alt="" />
              <h1 className="text-2xl text-blue-500 mt-4">{prof.name}</h1>
              <p className="text-lg text-blue-500">{isAdmin && 'Admin'}</p>
            </div>)
          }
        </div>
        
        <ul className="menu flex justify-center text-start w-11/12 mx-auto gap-4 py-10 px-6">



        {
          isAdmin ? <><NavLink className={'flex items-center nav gap-1  text-lg text-white'} to="/dashboard/admin-profile"><MdAdminPanelSettings /> Admin Profile</NavLink>
          
          
          <NavLink  className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/AddCamp"><IoAddCircleSharp />Add Camp</NavLink>
       
          <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/ManageCamp"><MdManageHistory /> Manage Camps</NavLink>
       
          <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/ManageRegisteredCamp"><MdManageAccounts /> Manage Registered </NavLink>
          <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/"><MdManageAccounts /> Home </NavLink>
          
          </> 
          : 
          
          <>
          
          
          <NavLink className={'flex items-center nav gap-1  text-lg text-white'} to={'/dashboard/analytics'}><IoMdAnalytics className="" />Analytics</NavLink>
          
          
          <NavLink  className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/user-profile"><CgProfile /> Profile</NavLink>
       
          <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/registered"><TbCampfireFilled /> Registered Camps</NavLink>
       
          <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/payment"><RiSecurePaymentLine /> Payment History</NavLink>
         
          <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/"><FaHome />Home</NavLink>
          </>
        }
  


        {/* <div className="divider border-t-2 text-white"></div> */}



        
        </ul>
       
      </div>
      {/* Dashboard Content */}
      <div className="w-full">
     
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

