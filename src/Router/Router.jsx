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
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'analytics',
                element: <Analytics></Analytics>,
            },
        ],
    },
]);

export default router;
