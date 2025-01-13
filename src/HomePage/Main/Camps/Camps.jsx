import { useEffect, useState } from "react";

const MedicalCamps = () => {
const [camps, setCamps] = useState([])
useEffect(() => {
    fetch('/camps.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setCamps(data)
    })
},[])

  return (
    <section className="py-10 w-11/12 mx-auto ">
      <h2 className="text-3xl font-semibold text-center mb-8">Popular Medical Camps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {camps.map((camp, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={camp.image} alt={camp.name} className="w-full  object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{camp.name}</h3>
            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {camp.fees}</p>
            <p className="text-gray-600 mb-1"><strong>Date & Time:</strong> {camp.dateTime}</p>
            <p className="text-gray-600 mb-1"><strong>Location:</strong> {camp.location}</p>
            <p className="text-gray-600 mb-1"><strong>Healthcare Professional:</strong> {camp.professional}</p>
            <p className="text-gray-600"><strong>Participants:</strong> {camp.participants}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
          See All Camps
        </button>
      </div>
    </section>
  );
};

export default MedicalCamps;
