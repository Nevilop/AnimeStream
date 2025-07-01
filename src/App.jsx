// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CustomNavbar from './components/CustomNavbar';
import Home from './components/Home';
import Carausal from './components/Carausal';
import PageDetail from './components/PageDetail';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import LoginPage from './components/LoginPage';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
     
      <Route path="/carausal" element={<Carausal />} />
      <Route path="/anime/:id" element={<PageDetail />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/login" element={<LoginPage />} />
      
    </Routes>
  );
};

export default App;
