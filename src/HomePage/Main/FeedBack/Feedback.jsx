import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ReactRating from 'react-rating';
import { IoStar } from "react-icons/io5";
import { div } from 'framer-motion/client';

const Feedback = () => {
    const {axiosPublic} = useAxiosPublic();
    const { data: feedback = [], isLoading, error } = useQuery({
        queryKey: 'feedback',  
        queryFn: async () => {
          try {
            const response = await axiosPublic.get('/feedback');
            return response.data;  
          } catch (err) {
            throw new Error('Failed to fetch feedback');
          }
        },
      });
    
      if (isLoading) {
        return <div>Loading feedback...</div>;
      }
    
      if (error) {
        return <div>Error loading feedback: {error.message}</div>;
      }
    console.log(feedback);
    return (
        <div className="bg-slate-100">
        <div className='w-11/12 mx-auto py-14 '>
        <h1 className="lg:text-7xl text-4xl md:text-5xl
 text-center font-semibold ">Feedback And Rating</h1>
        <p className='mb-16 text-center text-sm md:text-md lg:text-lg text-gray-500 mt-1'>Feedback and Rating allows participants to share opinions, helping organizers improve services and guiding others through shared experiences and ratings.</p>
            <div className='grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center gap-10'>
            {
                feedback.map(feed => 
                    <div className=' flex flex-col items-center rounded-xl overflow-scroll h-96 bg-[#ECF7FF] p-10 shadow-xl text-center space-y-3'>
                       <img className='w-32 h-32 object-cover rounded-full' src={feed.imageUrl} alt="" />
                        <h1 className="text-2xl">{feed.participantName}</h1>
                        <div className="flex items-center space-x-1">
        <ReactRating
          initialRating={feed.rating} // Set the initial rating
          readonly={true} // Make it read-only (if you don't want users to change it)
          fullSymbol={<IoStar className='text-yellow-400' />} // Full star
          emptySymbol={<IoStar />} // Empty star
          fractions={2} // Optional: Fractional ratings (e.g., 4.5 stars)
        />
      </div>
      <p className="md:text-lg text-sm ">{feed.description}</p>
                    </div>
              )
            }
            </div>
           
        </div>
        </div>
    );
};

export default Feedback;