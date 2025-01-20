import { div } from 'framer-motion/client'
import logo from '../../assets/Images/m.png'
const Footer = () => {
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
                        

            {/*  */}
        </div>
        </div>
    );
};

export default Footer;