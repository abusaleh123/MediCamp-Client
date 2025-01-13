import React from 'react';
import Navbar from '../Header/Navbar';
import Banner from '../Header/Banner';
import MedicalCamps from '../Main/Camps/Camps';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <MedicalCamps></MedicalCamps>
        </div>
    );
};

export default Home;