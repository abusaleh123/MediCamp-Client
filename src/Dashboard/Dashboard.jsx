
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
const Dashboard = () => {
  return (
    <div className="flex  bg-[#031B33]">
      {/* Dashboard side bar */}
      <div className="w-72 min-h-screen bg-[#031B33] text-center">
        <ul className="menu flex justify-center text-start w-11/12 mx-auto gap-4 py-10 px-6">



        <NavLink className={'flex items-center nav gap-1  text-lg text-white'} to="/dashboard/admin-profile"><MdAdminPanelSettings /> Admin Profile</NavLink>
          
          
          <NavLink  className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/AddCamp"><IoAddCircleSharp />Add Camp</NavLink>
       
          <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/ManageCamp"><MdManageHistory /> Manage Camps</NavLink>
       
          <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/ManageRegisteredCamp"><MdManageAccounts /> Manage Registered </NavLink>
  


        <div className="divider border-t-2 text-white"></div>



            <NavLink className={'flex items-center nav gap-1  text-lg text-white'} to="/dashboard/analytics"><IoMdAnalytics className="" /> Analytics</NavLink>
          
          
            <NavLink  className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/profile"><CgProfile /> Profile</NavLink>
         
            <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/registered"><TbCampfireFilled /> Registered Camps</NavLink>
         
            <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/dashboard/payment"><RiSecurePaymentLine /> Payment History</NavLink>
           
            <NavLink className={'flex items-center nav gap-1 text-lg text-white'}  to="/"><FaHome />Home</NavLink>
        
        </ul>
       
      </div>
      {/* Dashboard Content */}
      <div className="flex-1 w-9/12">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

