import React from 'react';
import Navbar from '../Header/Navbar';
import Banner from '../Header/Banner';
import MedicalCamps from '../Main/Camps/Camps';
import Feedback from '../Main/FeedBack/Feedback';
import ChooseUs from '../Choose/ChooseUs';
import AccordionCustomIcon from '../Choose/ChooseUs';
import { Helmet } from 'react-helmet';
import AboutMe from '../AboutMediCamp/AboutMe';
import WhyChoose from '../Choose/WhyChoose';
import ContactUs from '../Contact Us/ContactUs';
import App from '../Provide/Provide';
import Provide from '../Provide/Provide';

const Home = () => {
    return (
        <div>
            <Helmet> 
                <title>Home | MediCamp</title>
            </Helmet>
            {/* <Navbar></Navbar> */}
            <Banner></Banner>

            <MedicalCamps></MedicalCamps>
            <AboutMe></AboutMe>

          <ChooseUs></ChooseUs>
          <WhyChoose></WhyChoose>
     <Provide></Provide>
            <Feedback></Feedback>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;