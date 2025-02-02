import React from 'react';
import Navbar from '../Header/Navbar';
import Banner from '../Header/Banner';
import MedicalCamps from '../Main/Camps/Camps';
import Feedback from '../Main/FeedBack/Feedback';
import ChooseUs from '../Choose/ChooseUs';
import AccordionCustomIcon from '../Choose/ChooseUs';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet> 
                <title>Home | MediCamp</title>
            </Helmet>
            {/* <Navbar></Navbar> */}
            <Banner></Banner>
            <MedicalCamps></MedicalCamps>
          <ChooseUs></ChooseUs>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;