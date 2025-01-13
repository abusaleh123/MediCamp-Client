import React from 'react';
import Navbar from '../HomePage/Header/Navbar';
import { Outlet } from 'react-router-dom';

const Base = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Base;