import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
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
    const lastTwoWords = nameParts.slice(-2).join(' ');  
  
    return {
      dateTime: lastTwoWords,
      fees: parseInt(camp.fees),
      additionalMetric: camp.additionalMetric || 0
    };
  });

  // Custom bar shape
  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    return (
      <path
        d={`M${x},${y + height} L${x + width / 2},${y} L${x + width},${y + height} Z`}
        fill={fill}
      />
    );
  };

  // Colors array for bars
  const colors = ['#8A2BE2', '#FFD700', '#FF4500', '#1E90FF', '#FFA500', '#32CD32'];


  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };



  return (
    <div className="w-10/12 mx-auto pt-20">
      <h2 className='text-4xl text-center text-white'>Analytics</h2>
      <p className="md:text-lg mb-10 mt-2 text-center text-white/70">
        View camp analytics, including camp names and fees for joining, to make informed decisions.
      </p>
      <div className='bg-[#10273D] py-6 pr-8 rounded-xl'>
        <p className="md:text-2xl text-xl text-white/70 mb-10 pl-10">Camp Name And Fees</p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EF7258" />
                <stop offset="50%" stopColor="#B463A0" />
                <stop offset="100%" stopColor="#7D54E3" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} color='#FFF' />
            <XAxis dataKey="dateTime" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="fees"
              stroke="url(#colorSales)"
              strokeWidth={5}
              dot={{ r: 6, fill: '#fff', stroke: '#8a2be2', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
<div className='mt-10 border-t text-center '>
<ResponsiveContainer className={'mt-10'} width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} color='' />
            <XAxis dataKey="dateTime" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="fees" shape={<TriangleBar />}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
</div>
       
      </div>
    </div>
  );
};

export default Analytics;
