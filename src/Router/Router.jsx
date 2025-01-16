// import { createBrowserRouter } from "react-router-dom";
// import Home from "../HomePage/Home/Home";
// import Base from "../Base/Base";
// import AvailableCamps from "../Pages/AvailableCamps";
// import CampDetails from "../Pages/CampDetails/CampDetails";
// import Register from "../Pages/Register/Register";
// import Login from "../Pages/Login/Login";
// import Dashboard from "../Dashboard/Dashboard";
// import Analytics from "../Dashboard/Analylics/Analytics";



// const router = createBrowserRouter([
    
//     {
//         path: '/',
//         element:<Base></Base>,
//         children: [
//             {
//                     path: '/',
//                     element: <Home></Home>
//             },
//             {
//                 path: '/availableCamp',
//                 element: <AvailableCamps></AvailableCamps>
//             },
//             {
//                 path: '/camp-details/:id',
//                 element: <CampDetails></CampDetails>,
//                 loader: ({params}) => fetch(`http://localhost:5000/camp-details/${params.id}`)
//             },
//             {
//                 path: '/register',
//                 element:<Register></Register>
//             },
//             {
//                 path: '/login',
//                 element: <Login></Login>
//             }
           

//         ]
//     },
//     {
//         path: 'dashboard',
//         element: <Dashboard></Dashboard>,
//         element: [
//             {
//                 path: '/dashboard/analytics',
//                 element: <Analytics></Analytics>
//             }
//         ]
        
//     }

// ])

// export default router;




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

const router = createBrowserRouter([
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
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/login',
                element: <Login></Login>,
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
                element: <UserProfile></UserProfile>
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
            }
        ],
    },
]);

export default router;
