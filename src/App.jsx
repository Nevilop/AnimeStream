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
import AnimeList from './components/AnimeList';



const App = () => {
  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carausal" element={<Carausal />} />
        <Route path="/anime/:id" element={<PageDetail />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/list" element={<AnimeList />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
