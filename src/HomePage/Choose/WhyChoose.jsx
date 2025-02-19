import bg from '../../assets/Images/gray.jpg'
import { FaHeartPulse } from "react-icons/fa6";
import { easeInOut, motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const WhyChoose = () => {
   const {theme } = useAuth()
    return (
        <div className={` ${theme === 'dark' ? 'bg-[#ECF7FF ]' : 'bg-black text-white/90'} `}>
            <section className='w-11/12 mx-auto py-20'>
               <div className='flex flex-col lg:flex-row justify-between gap-4'>


               <div className='lg:w-9/12' >
                <div className='flex items-center gap-2 text-xl text-center justify-center lg:justify-start '>
                    <motion.p
                    initial={{ scale: 1, rotateY: 0 }}
                    animate={{ scale: [1, 1, 1], rotateY: [0, 180, 360] }}
                    transition={{
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className='w-fit '
                    ><FaHeartPulse className='text-blue-600' /> </motion.p>
                    <p className="text-blue-600 text-center"> Why Choose Us</p>
                </div>
                    <h1 className="text-5xl font-semibold mt-6 lg:w-3/4 text-center lg:text-start">Advanced Treatments
                    Compassionate Care</h1>
                    <p className="text-lg text-gray-600 mt-10 w-3/4">Completely e-enable covalent functionalities and market positioning infomediaries. Interactively initiate exceptional</p>
<p className="border-t-2 my-10"></p>
                    {/* Card */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
                        {/* Card 1 */}
                 <div className='flex gap-4 items-center'>
                    <div>

                         <p className='bg-[#041C33] p-4 rounded-full w-fit'><FaPlusCircle className='text-[#def1ac] text-3xl' /></p>
                    </div>
                         <div className='space-y-2'>
                            <h1 className="text-3xl font-semibold">Idustry Experience</h1>
                            <p className="text-md text-gray-600">Industry Experience strengthens market positioning, fosters innovation, and drives strategic growth in healthcare and pharmaceuticals.</p>
                         </div>
                 </div>
                        {/* Card 1 */}
                 <div className='flex gap-4 items-center'>
                    <div>

                         <p className='bg-[#041C33] p-4 rounded-full w-fit'><GiMedicines className='text-[#def1ac] text-3xl' /></p>
                    </div>
                         <div className='space-y-2'>
                            <h1 className="text-3xl font-semibold">Medichine Expert</h1>
                            <p className="text-md text-gray-600">Medicine Expertise advances drug development, regulatory compliance, and innovative therapeutic solutions for effective disease management.</p>
                         </div>
                 </div>
                        {/* Card 1 */}
                 <div className='flex gap-4 items-center'>
                    <div>

                         <p className='bg-[#041C33] p-4 rounded-full w-fit'><TbBrandGoogleAnalytics className='text-[#def1ac] text-3xl' /></p>
                    </div>
                         <div className='space-y-2'>
                            <h1 className="text-3xl font-semibold">Disease Analysis</h1>
                            <p className="text-md text-gray-600">Disease analysis drives precision medicine, customer focus enhances engagement, medical expertise ensures innovation, and industry experience strengthens market positioning strategies.</p>
                         </div>
                 </div>
                        {/* Card 4 */}
                 <div className='flex gap-4 items-center'>
                    <div>

                         <p className='bg-[#041C33] p-4 rounded-full w-fit'><MdOutlineDashboardCustomize className='text-[#def1ac] text-3xl' /></p>
                    </div>
                         <div className='space-y-2'>
                            <h1 className="text-3xl font-semibold">Customer Focus</h1>
                            <p className="text-md text-gray-600">Customer Focus drives patient-centered solutions, improves engagement, and ensures satisfaction through personalized healthcare services.</p>
                         </div>
                 </div>
                    </div>

                </div>

                <div className='lg:w-3/12 flex items-end justify-center  rounded-xl'>
  <div
    
    className='flex bg-[#24425e] rounded-xl w-full justify-center py-10 px-5 relative before:absolute before:inset-0  before:opacity-50 before:w-full before:h-full'
  >
   <div className='z-10 flex flex-col items-center '>
   <p className="bg-[#DBE9A1] inset-2 w-fit p-2 rounded-full"><FaRegStar className='text-5xl' /></p>
   <h1 className="text-4xl text-white mt-6 text-center">Being Your Journey with MediCamp</h1>
   <p className="text-lg text-gray-400 mt-6 text-center">Completely enable covalent function positioning infomediarie</p>
   <Link to={'/availableCamp'} className="mt-28 btn btn-ghost bg-[#007EFF] text-white text-lg rounded-full px-12">Available</Link>
   </div>
  </div>
</div>



               </div>
            </section>
        </div>
    );
};

export default WhyChoose;