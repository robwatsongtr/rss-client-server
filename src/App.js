import React, { useState, useEffect } from 'react';
import TitlesBoxA from './components/TitlesBoxA';
import ContentBoxB from './components/ContentBoxB';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <>
       <Navbar />

        <div className="appLayout">

            <TitlesBoxA 
              
            />

            <ContentBoxB 
              
            />

          
        </div>

    </>
  );
}

export default App;
