import { createBrowserRouter } from "react-router-dom";
import Home from "../HomePage/Home/Home";
import Base from "../Base/Base";
import AvailableCamps from "../Pages/AvailableCamps";
import CampDetails from "../Pages/CampDetails/CampDetails";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Analytics from "../Dashboard/Analylics/Analytics";
import UserProfile from "../Dashboard/User/UserProfile";
import PrivateRoute from "../Provider/PrivateRoute";
import AddCamp from "../Dashboard/AddCamp/AddCamp";
import AdminRoute from "../Provider/AdminRoute";
import ManageCamps from "../Dashboard/ManageCamps/ManageCamps";
import UpdateCamp from "../Dashboard/UpdateCamp/UpdateCamp";
import AdminProfile from "../Dashboard/AdminProfile/AdminProfile";
import RegisterCamp from "../Dashboard/User/RegisteredCamp/RegisterCamp";
import Payment from "../Dashboard/User/Payment/Payment";
import PaymentHistory from "../Dashboard/User/PaymentHistory/PaymentHistory";
import ManageRegister from "../Dashboard/AdminRegister/ManageRegister";

const router = createBrowserRouter([
    {
        path: '/register',
        element: <Register></Register>,
    },
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/',
        element: <Base></Base>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/availableCamp',
                element: <AvailableCamps></AvailableCamps>,
            },
            {
                path: '/camp-details/:id',
                element: <CampDetails></CampDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/camp-details/${params.id}`),
            },
          
            
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        children: [
            // ! Normal User Route
            {
                path: 'analytics',
                element: <PrivateRoute>
                    <Analytics></Analytics>
                </PrivateRoute>,
            },
            {
                path: '/dashboard/user-profile',
                element: <PrivateRoute>
                    <UserProfile></UserProfile>
                </PrivateRoute>
            },
            {
                path: '/dashboard/registered',
                element: <RegisterCamp></RegisterCamp>
            },
            {
                path:'/dashboard/registerById/:id',
                element: <Payment></Payment>,
                loader: ({params}) => fetch(`http://localhost:5000/dashboard/registerById/${params.id}`)
            },
            {
                path: '/dashboard/paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            
            // ! Admin Route
            {
                path: '/dashboard/AddCamp',
                element: <AdminRoute>
                    <AddCamp></AddCamp>
                </AdminRoute>
            },
            {
                path: '/dashboard/ManageCamp',
                element: <AdminRoute>
                    <ManageCamps></ManageCamps>
                </AdminRoute>
            },
            {
                path: '/dashboard/update-camp/:id',
                element: <AdminRoute>
                  <UpdateCamp></UpdateCamp>
                  
                </AdminRoute>,
                loader : ({ params }) => fetch(`http://localhost:5000/dashboard/update-camp/${params.id}`)
            },
            {
                path: '/dashboard/admin-profile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: '/dashboard/ManageRegisteredCamp',
                element: <ManageRegister></ManageRegister>
            }
        ],
    },
]);

export default router;
