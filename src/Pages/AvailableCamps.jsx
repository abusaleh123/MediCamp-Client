import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import bg from '../../src/assets/Images/blog12.jpg';
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useState } from 'react';
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import useAuth from '../Hooks/useAuth';
import { Helmet } from 'react-helmet';

const AvailableCamps = () => {
    const { axiosPublic } = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [layOut, setLayOut] = useState(true);
    const {user} = useAuth()
   const toggleLayout = ()  => {
            setLayOut(lay => !lay)
   }

    // Fetch available camps with useQuery
    const { data: available = [], refetch } = useQuery({
        queryKey: ['available-camps', { search, sort }],
        queryFn: async () => {
            const searchQuery = `?search=${search}&sort=${sort}`;
            const res = await axiosPublic.get(`/available-camps${searchQuery}`);
            return res.data;
        },
        enabled: true, // Always enabled to trigger refetch
        refetchOnWindowFocus: false, // Disable refetch on window focus
        keepPreviousData: true, // Keep previous data while fetching new data
    });

    const handleSearch = () => {
        refetch(); // Trigger the refetch with new query parameters
    };

    return (
        <div>
            <Helmet>
                <title>Available Camp | MediCamp</title>
            </Helmet>
            <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="py-28 relative object-cover">
                <div className="absolute inset-0 bg-[#0a1f31] bg-opacity-90"></div>
                <div className="relative z-10 text-white p-8 flex flex-col justify-center items-center text-center mx-auto">
                    <h1 className="lg:text-7xl text-4xl md:text-5xl font-bold">Available Camp</h1>
                    <p className="mt-4 text-sm md:text-lg lg:text-xl">Join us for an enriching experience at our medical camps.</p>
                    <p className="flex justify-center items-center gap-1 mt-2">
                        <span className="flex justify-center items-center text-sm md:text-lg lg:text-xl text-[#3E8BFF]">
                            <Link to="/">Home</Link>
                        </span>
                        <MdKeyboardDoubleArrowRight className="text-2xl" />
                        <span className="text-sm md:text-lg lg:text-xl">Available Camp</span>
                    </p>
                    <div className="w-10/12 mx-auto my-4">
                <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
                    <div className='flex bg-[#35485B] p-1 rounded-xl '>
                    <input
                        type="text"
                        placeholder="Search camps..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input focus:outline-none bg-[#35485B] placeholder:text-white w-full focus:border-none   md:mb-0"
                    />
                     <button onClick={handleSearch} className="btn btn-ghost border-none hover:bg-[#007EFF] bg-[#007EFF] text-sm md:text-lg ">
                        Search
                    </button>
                    </div>
                   
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="select bg-[#35485B]  select-bordered w-full md:w-1/4"
                    >
                        <option selected disabled value="">Sort by</option>
                        <option value="participants">Most Participants</option>
                        <option value="feess">Fees</option>
                        <option value="names">Alphabetical Order</option>
                    </select>
                   <button className='btn btn-ghost bg-[#007EFF] hover:bg-[#007EFF] px-6' onClick={toggleLayout}>{layOut === true ? <TfiLayoutGrid2Alt  className='text-xl'/> : <TfiLayoutGrid3Alt className='text-xl' />}</button>
                </div>
            </div>
                </div>

                
            </div>
            <div className='bg-slate-100 py-10'>

            <div className={`md:w-10/12 ${layOut === true ? 'w-10/12' : 'md:w-8/12'} mx-auto`}>
                <div className={`grid grid-cols-1   ${layOut === true ? 'xl:grid-cols-3 lg:grid-cols-2' : 'lg:grid-cols-2' } gap-8`}>
                 
                     {available.length > 0 ? (
                        available.map((camp, index) => (
                            <div key={index} className="bg-[#ECF7FF] p-6 rounded-lg shadow-lg">
                                <img src={camp.image} alt={camp.name} className="w-full h-96 object-cover rounded-lg mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{camp.name}</h3>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600 mb-1"><strong>Fees:</strong> {camp.fees === 0 ? ' Free' : `${camp.fees}`}</p>
                                    <p className="text-gray-600 mb-1"><strong>Date:</strong> {camp.dateTime}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600 mb-1"><strong>Location:</strong> {camp.location}</p>
                                    <p className="text-gray-600"><strong>Participants:</strong> {camp.participants}</p>
                                </div>
                                <p className="text-gray-600"><strong>Healthcare Professional:</strong> {camp.professional}</p>
                                <Link to={`/camp-details/${camp._id}`} className="btn btn-ghost md:px-6 bg-[#007EFF] hover:bg-[#007EFF] text-white mt-4 text-lg rounded-xl">
                                    See Details
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center h-96 text-xl text-blue-500 col-span-3 items-center flex justify-center   mt-4">There is no camp added</p>
                    )}
                    
                    
                    
                </div>
            </div>
            </div>
        </div>
    );
};

export default AvailableCamps;
