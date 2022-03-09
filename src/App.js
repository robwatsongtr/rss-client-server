import React, { useState, useEffect } from 'react';
import FeedsBoxA from './components/FeedsBoxA';
import TitlesBoxB from './components/TitlesBoxB';
import ContentBoxC from './components/ContentBoxC';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';


function App() {
  return (
    <>
       <Navbar />

        <div className="appLayout">

            <FeedsBoxA

            />

            <TitlesBoxB 
              
            />

            <ContentBoxC 
              
            />
         
        </div>

    </>
  );
}

export default App;
