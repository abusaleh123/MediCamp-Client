import image1 from '../../assets/Images/about_thumb (1).jpg'
import image2 from '../../assets/Images/about-img.png'
import { FaCheck } from "react-icons/fa6";

const AboutMe = () => {
    return (
        <div className=' mx-auto py-16'>
            <div className='w-11/12 mx-auto'>
            <div 
        className="mx-auto text-center mb-10">
          <h1 className="lg:text-7xl  text-4xl md:text-5xl
">About MediCamp</h1>
          <p className="text-sm  md:text-lg mt-2">MediCamp is a non-profit healthcare initiative dedicated to providing free medical aid, wellness, and treatment to underserved communities.</p>
        </div>



        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Text */}
            <div className=''>
            <h1 className="text-5xl font-semibold">Delivering Quality Health?s Care for Generations</h1>
            <img src={image2} alt="" className=" mt-6 rounded-xl" />
            </div>
            {/* text-2 */}
            <div className=''>
               <div className='flex gap-6  items-center '>
               <span className='py-7 px-4 justify-center object-cover rounded-full text-white/90 bg-[#041C33] text-4xl'>10+</span>
               <h1 className="text-3xl font-semibold w-2/4"> Years of Experience</h1>
               </div>
              <div className='flex  border-l-2 gap-6 border-blue-500 mt-4 items-center'>
                <p className=''> </p>
              <p className="text-lg  ">Completely e-enable covalent functionalities and market positioning infomediaries initiate exceptional hospital supply</p>
              </div>
              <section className='mt-10 space-y-4'>
                <div className='flex gap-4 items-center'>
                <FaCheck className='text-white text-xl bg-blue-500 rounded-full p-1' />
                <p className="text-lg">From Prevention to Recovery</p>
                </div>
                <div className='flex gap-4 items-center'>
                <FaCheck className='text-white text-xl bg-blue-500 rounded-full p-1' />
                <p className="text-lg">From Prevention to Recovery</p>
                </div>
                <div className='flex gap-4 items-center'>
                <FaCheck className='text-white text-xl bg-blue-500 rounded-full p-1' />
                <p className="text-lg">From Prevention to Recovery</p>
                </div>
              </section>
              <p className="border-t mt-6"></p>
              
            </div>
            <div>
                <img src={image1} alt="" className='rounded-xl' />

            </div>
        </div>
            </div>
        </div>
    );
};

export default AboutMe;