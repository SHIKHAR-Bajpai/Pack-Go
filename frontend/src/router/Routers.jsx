import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import TourDetails from '../pages/TourDetails';
import Tours from '../pages/Tours';
import ThankYou from '../pages/ThankYou';
import ImagesGallery from '../components/Image-gallery/ImagesGallery';
import About from '../components/AboutUs/AboutUs';
import Admin from '../components/Admin/Admin';
import ManageTours from '../components/Admin/ManageTours';
import ViewBookings from '../components/Admin/viewBookings'; 
import ViewUsers from '../components/Admin/viewUsers';
import ProtectedRoute from './ProtectedRoutes';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/about" element={<About />} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/gallery" element={<ImagesGallery />} />
            <Route path="/tours/search" element={<SearchResultList />} />
            
            {/* Protected routes for admin */}
            <Route path="/admin" element={<ProtectedRoute element={Admin} />} />
            <Route path="/admin/viewbookings" element={<ProtectedRoute element={ViewBookings} />} /> 
            <Route path="/admin/manageTours" element={<ProtectedRoute element={ManageTours} />} />
            <Route path="/admin/viewusers" element={<ProtectedRoute element={ViewUsers} />} /> 
        </Routes>
    );
}

export default Routers;
