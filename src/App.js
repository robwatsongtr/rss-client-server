import React, { useState, useEffect } from 'react';
import FeedsBoxA from './components/FeedsBoxA';
import TitlesBoxB from './components/TitlesBoxB';
import ContentBoxC from './components/ContentBoxC';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';


function App() {

  const [feed, setFeed] = useState({
    feedTitle: ''
  })

  useEffect( () => {  

    axios.get('http://localhost:5000/')
      .then( response => {
        setFeed({
          feedTitle: response
        })
      }) 
    
  },[])

  console.log(feed);

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
