import React, { useState, useEffect } from 'react';
import FeedsBoxA from './components/FeedsBoxA';
import TitlesBoxB from './components/TitlesBoxB';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';


function App() {

  const [feed, setFeed] = useState({
    feedData: []
  })

  useEffect( () => {  

    (async () => {
      try {
        let response = await axios.get('http://localhost:5000/rssTest' );
        setFeed({
          feedData: response.data
        })
      } catch (error) {
        console.error(error)
      }
    })();
  
  },[])

  console.log(feed);

  return (
    <>
       <Navbar />

        <div className="appLayout">

            <FeedsBoxA
              label="FeedsBoxA"
              feedInfo={ feed.feedData }
            />

            <TitlesBoxB 
              label="TitlesBoxB"
              feedInfo={ feed.feedData }
            /> 
         
        </div>

    </>
  );
}

export default App;


 