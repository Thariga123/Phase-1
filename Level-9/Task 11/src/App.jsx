import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';

import NavBar from './components/Navbar';
import PageWrapper from './components/PageWrapper';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import './App.css';

export default function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <PageWrapper><Home /></PageWrapper>
              } 
            />
            <Route 
              path="/about" 
              element={
                <PageWrapper><About /></PageWrapper>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <PageWrapper><Projects /></PageWrapper>
              } 
            />
          </Routes>
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}
