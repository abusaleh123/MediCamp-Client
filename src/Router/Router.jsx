import { createBrowserRouter } from "react-router-dom";
import Home from "../HomePage/Home/Home";
import Base from "../Base/Base";
import AvailableCamps from "../Pages/AvailableCamps";
import CampDetails from "../Pages/CampDetails/CampDetails";
import Register from "../Pages/Register/Register";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>

    },
    {
        path: '/',
        element:<Base></Base>,
        children: [
            {
                path: '/availableCamp',
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: '/camp-details/:id',
                element: <CampDetails></CampDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/camp-details/${params.id}`)
            },
            {
                path: '/register',
                element:<Register></Register>
            }
        ]
    }

])

export default router;