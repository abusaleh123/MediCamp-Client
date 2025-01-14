import { createBrowserRouter } from "react-router-dom";
import Home from "../HomePage/Home/Home";
import Base from "../Base/Base";
import AvailableCamps from "../Pages/AvailableCamps";


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
            }
        ]
    }

])

export default router;