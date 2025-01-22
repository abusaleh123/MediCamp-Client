

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdAnalytics } from "react-icons/io";
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
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { IoBasketball } from "react-icons/io5";

import {
  Drawer,
  Button,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { axiosSecure } = useAxiosSecure();
  const { user, open, setOpen } = useAuth();
  // const [open, setOpen] = React.useState(false);

 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const fetchAdminProfile = async (email) => {
    const response = await axiosSecure.get(`/profilePublic?email=${email}`);
    return response.data;
  };

  const { data: profile, error, isLoading, refetch } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: () => fetchAdminProfile(user.email),
    enabled: !!user?.email,
  });

  refetch();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  const drawerContent = (
    <div className="bg-[#031B33] min-h-screen">
      <div className="p-4 text-white bg-[#031B33]">
        <IconButton className="bg-white" onClick={closeDrawer}>
          <CloseIcon className="text-white" />
        </IconButton>
        <Typography className="text-white" variant="h5" component="div">
        

         {
          profile.map(prof => <div className="mb-10">
          <img className="w-40 rounded-full h-40 object-cover p-2 border border-blue-900 bg-blue-900 " src={prof.photo} alt="" />
          </div>)
         }

Dashboard Menu
        </Typography>
      </div>
      <Divider />
      <List className="text-white ">
        {isAdmin ? (
          <>
            <ListItem className="" button component={NavLink} to="/dashboard/admin-profile">
              <ListItemIcon className=""><MdAdminPanelSettings  className="text-white " /></ListItemIcon>
              <ListItemText primary="Admin Profile" />
            </ListItem>
            <ListItem button component={NavLink} to="/dashboard/AddCamp">
              <ListItemIcon><IoAddCircleSharp  className="text-white nav"/></ListItemIcon>
              <ListItemText primary="Add Camp" />
            </ListItem>
            <ListItem button component={NavLink} to="/dashboard/ManageCamp">
              <ListItemIcon><MdManageHistory  className="text-white nav"/></ListItemIcon>
              <ListItemText primary="Manage Camps" />
            </ListItem>
            <ListItem button component={NavLink} to="/dashboard/ManageRegisteredCamp">
              <ListItemIcon><MdManageAccounts  className="text-white nav" /></ListItemIcon>
              <ListItemText primary="Manage Registered" />
            </ListItem>
           
            <ListItem  button component={NavLink} to="/availableCamp">
              <ListItemIcon><IoBasketball className="text-white" /></ListItemIcon>
              <ListItemText primary="Available Camp" />
            </ListItem>
            <ListItem   button component={NavLink} to="/">
              <ListItemIcon><FaHome className="text-white w-fit "/></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </>
        ) : (
          <>
          <ListItem  button component={NavLink} to="/dashboard/user-profile">
              <ListItemIcon><CgProfile className="text-white w-fit " /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={NavLink} to="/dashboard/analytics">
              <ListItemIcon><IoMdAnalytics className="text-white w-fit " /></ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            
            <ListItem button component={NavLink} to="/dashboard/registered">
              <ListItemIcon><TbCampfireFilled className="text-white w-fit " /></ListItemIcon>
              <ListItemText primary="Registered Camps" />
            </ListItem>
            <ListItem button component={NavLink} to="/dashboard/paymentHistory">
              <ListItemIcon><RiSecurePaymentLine className="text-white w-fit" /></ListItemIcon>
              <ListItemText primary="Payment History" />
            </ListItem>
            <ListItem  button component={NavLink} to="/availableCamp">
              <ListItemIcon><IoBasketball className="text-white" /></ListItemIcon>
              <ListItemText primary="Available Camp" />
            </ListItem>
            <ListItem button component={NavLink} to="/">
              <ListItemIcon><FaHome  className="text-white w-fit "/></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <div className="bg-[#031B33] min-h-screen">
      <div className="lg:flex  ">
        {/* Drawer Button */}
       <div className={`${open  ?"w-96" : 'w-fit'}  flex pt-6 justify-end`}>
      {
        open ? '' :  <Button className={`h-fit w-fit  text-end `} variant="" onClick={openDrawer}>
        <IoMdMenu className="text-white text-2xl" />
        </Button>
      }
       </div>
       
        <Drawer
        className=""
          anchor="left"
          open={open}
          onClose={closeDrawer}
          ModalProps={{ keepMounted: true }} // Improve performance on mobile
        >
          {drawerContent}
        </Drawer>
        {/* Dashboard Content */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


