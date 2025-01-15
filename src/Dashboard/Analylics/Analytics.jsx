




import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const Analytics = () => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      axiosSecure.get(`/register?email=${user.email}`)
        .then(res => {
          setCamps(res.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [user.email, axiosSecure]);

  // Transform data for the chart
  const chartData = camps.map(camp => {
    const nameParts = camp.name.split(' ');
    const lastTwoWords = nameParts.slice(-2).join(' ');  // Get the last two words
  
    return {
      dateTime: lastTwoWords, // Last two words as the dateTime
      fees: camp.fees,  // Fees value
      additionalMetric: camp.additionalMetric || 0  // Additional metric if available, else 0
    };
  });

  return (
    <div className="w-11/12  mx-auto  pt-20 ">
      <h2 className='text-7xl text-white mb-10'>Analytics</h2>
      <div className='bg-[#10273D] py-6 pr-8 rounded-xl '>

      <p className="text-2xl text-white/70 mb-10 pl-10">Camp Name And Fees</p>
      <ResponsiveContainer width="100%" height={300}>
     
      <LineChart data={chartData}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EF7258" />
            <stop offset="50%" stopColor="#B463A0" />
            <stop offset="100%" stopColor="#7D54E3" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} color='#FFF'/>
        <XAxis dataKey="dateTime" />
        <YAxis dataKey={'fees'} />
        <Tooltip  />
        <Line type="monotone" dataKey="fees" stroke="url(#colorSales)" strokeWidth={5}  dot={{ r: 6, fill: '#fff', stroke: '#8a2be2', strokeWidth: 2 }} />
      </LineChart>
    </ResponsiveContainer>
    </div>
    </div>
  );
};

export default Analytics;


