import { div } from 'framer-motion/client'
import logo from '../../assets/Images/m.png'
import { NavLink } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
const Footer = () => {
    // const [isAdmin] = useAdmin();
    return (
        <div className='bg-[#031B33] py-10'>
        <div className=" w-11/12 mx-auto">
        {/*  */}
            <div className='flex justify-between items-center'>
                <div className='flex gap-1 items-center  '>
                    <img className='w-20' src={logo} alt="" />
                    <h1 className='text-4xl text-white'>MediCamp</h1>
                </div>
                <div>
                    <h1 className="text-4xl text-white">Medical Camp Management System (MCMS)</h1>
                </div>
            </div>
            <p className="border-t my-6 border-gray-600"> </p>
            {/*  */}
            {/*  */}
                        <div className='grid grid-cols-3 gap-10'>
                            <div className='text-white'>
                                <h1 className="text-4xl">About Us</h1>
                                <p className="text-lg mb-6 text-white/70">An intuitive platform to manage medical camps, registrations, and participant details for efficient operations.</p>
                                <p className="text-xl mb-4">All Over the World</p>
                                    <p className="text-xl">Thank you all for visiting Us</p>
                            </div>
                            <div className='text-white'>
                            <h1 className="text-4xl">Site Links</h1>
                            <ul className='text-white/60 flex flex-col gap-1'>
                           <NavLink to={'/'}> Home</NavLink>
                           <NavLink to={'/availableCamp'}> Available Camps</NavLink>
                           <NavLink to={'/dashboard/user-profile'}> Profile</NavLink>
                           <NavLink to={'/dashboard/analytics'}> Analytics</NavLink>
                           <NavLink to={'/dashboard/registered'}> Registered</NavLink>
                        
                            </ul>
                            </div>
                            <div>

                            </div>
                        </div>

            {/*  */}
        </div>
        </div>
    );
};

export default Footer;