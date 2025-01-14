import { useLoaderData } from 'react-router-dom';
import bg from '../../assets/detailsBanner.jpg'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const CampDetails = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
        <div style={{backgroundImage: `url(${bg})`, backgroundSize:'cover', backgroundPosition: 'center'}} className='py-40 relative  object-cover'>
           <div class="absolute inset-0 bg-[#0a1f31] bg-opacity-90 "></div>
    <div class="relative z-10 text-white p-8 flex flex-col justify-center items-center text-center mx-auto">
        
        <h1 class="text-7xl  font-bold">Welcome to {data.name}</h1>
        <p class="mt-4 text-xl">Join us for an enriching experience at our medical camps.</p>
        <p className='flex justify-center items-center gap-1 mt-2'><span className='flex justify-center items-center text-xl text-[#3E8BFF]'>Home </span> <MdKeyboardDoubleArrowRight className='text-2xl' /> <span className="text-xl">{data.name}</span></p>
    </div>

   
        </div>
        {/* Information */}
        <div className='w-10/12 mx-auto py-20'>
        <div className="w-full mx-auto flex gap-10 p-6 items-center rounded-xl ">
  {/* Image Section */}
  <div className="w-5/12">
    <img className="rounded-xl w-full object-cover" src={data.image} alt={data.name} />
  </div>
  {/* Content Section */}
  <div className="flex-1">
    <h1 className="text-5xl font-bold mb-4">{data.name}</h1>
    <div className="text-lg text-gray-700 mb-4">
      <p><span className="font-semibold">Camp Fees:</span> {data.fees}</p>
      <p><span className="font-semibold">Date and Time:</span> {data.dateTime}</p>
      <p><span className="font-semibold">Location:</span> {data.location}</p>
      <p><span className="font-semibold">Healthcare Professional:</span> {data.professional}</p>
      <p><span className="font-semibold">Participant Count:</span> {data.participants}</p>
    </div>
    <p className="text-gray-600 mb-6 text-lg">
      {data.description}
    </p>
    <button onClick={()=>document.getElementById('my_modal_4').showModal()}  className="px-6 py-3 bg-blue-500 text-lg text-white rounded-lg hover:bg-blue-600 transition duration-300">
      Join Camp
    </button>
  </div>
</div>

    </div>

{/* Modal */}


<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
   
{/*  */}
<div className="hero ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
{/*  */}



   
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>


{/* Modal */}
    
        </div>

 

    );
};

export default CampDetails;