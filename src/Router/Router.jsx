import { createBrowserRouter } from "react-router-dom";
import Home from "../HomePage/Home/Home";
import Base from "../Base/Base";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>

    },
    {
        path: '/',
        element:<Base></Base>
    }

])

export default router;