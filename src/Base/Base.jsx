import React from 'react';
import Navbar from '../HomePage/Header/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../HomePage/Footer/Footer';

const Base = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Base;