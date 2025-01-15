




// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
 
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAuth from '../../Hooks/useAuth';




// const Analytics = () => {
//   const { user } = useAuth();
// const {axiosSecure} = useAxiosSecure();
// const [camps, setCamps] = useState([])

// useEffect(() => {
//     if (user && user.email) {
//         axiosSecure.get(`/register?email=${user.email}`)
//             .then(res => {
//                 // console.log(res.data);
//                 // setLoading(true);
//                 setCamps(res.data);
//                 setLoading(false)
//             })
//             .catch(error => {
//                 // console.log(error);
//             });
//     }
// }, []);
// console.log(camps);
//   // Transform data for the chart
//   const chartData = camps.map(camp => ({
//     dateTime: camp.dateTime, // Format date as needed
//     fees: camp.fees
//   }));

//   return (
//     <div className=' border w-full border-black'>
//       <h2>Analytics</h2>
//       <BarChart
//         width={600}
//         height={300}
//         data={chartData}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="dateTime" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="fees" fill="#8884d8" />
//       </BarChart>
//     </div>
//   );
// };

// export default Analytics;




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
    <div className="w-11/12 border border-black">
      <h2>Analytics</h2>
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
  );
};

export default Analytics;




// import React, { useEffect, useState } from 'react';
// import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAuth from '../../Hooks/useAuth';

// const Analytics = () => {
//   const { user } = useAuth();
//   const { axiosSecure } = useAxiosSecure();
//   const [camps, setCamps] = useState([]);

//   useEffect(() => {
//     if (user && user.email) {
//       axiosSecure.get(`/register?email=${user.email}`)
//         .then(res => {
//           setCamps(res.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   }, [user.email, axiosSecure]);

//   // Transform data for the chart
//   const chartData = camps.map(camp => ({
//     dateTime: camp.dateTime.split(' ')[0], // Format date as needed
//     fees: camp.fees
//   }));

//   return (
//     <div className="w-11/12 border border-black">
//       <h2>Analytics</h2>
//       <ResponsiveContainer width={'100%'} height={300} >
//       <AreaChart
    
//         data={chartData}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="dateTime" />
//         <YAxis />
//         <Tooltip />
//         <Area type="monotone" dataKey="fees" stroke="#2196F3" fill="#e0f2fe" strokeWidth={6} />
//       </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Analytics;




// import React, { useEffect, useState } from 'react';
// import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAuth from '../../Hooks/useAuth';

// const Analytics = () => {
//   const { user } = useAuth();
//   const { axiosSecure } = useAxiosSecure();
//   const [camps, setCamps] = useState([]);

//   useEffect(() => {
//     if (user && user.email) {
//       axiosSecure.get(`/register?email=${user.email}`)
//         .then(res => {
//           setCamps(res.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   }, [user.email, axiosSecure]);

//   // Transform data for the chart
  

//   return (
//     <div className="w-11/12 border border-black">
//       <h2>Analytics</h2>
//       <ResponsiveContainer width={'100%'} height={300}>
//         <AreaChart
//           data={chartData}
//           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="dateTime" />
//           <YAxis />
//           <Tooltip />
//           <Area type="monotone" dataKey="fees" stackId="1" stroke="#2196F3" fill="#e0f2fe" strokeWidth={2} />
//           <Area type="monotone" dataKey="additionalMetric" stackId="1" stroke="#FF5722" fill="#ffe0b2" strokeWidth={2} />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Analytics;
