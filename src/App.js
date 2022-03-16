import React, { useState, useEffect } from 'react';
import FeedsBoxA from './components/FeedsBoxA';
import TitlesBoxB from './components/TitlesBoxB';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';


function App() {

  const [feed, setFeed] = useState({})

  const [feedItems, setFeedItems] = useState([])

  // Utility routine to turn an array of feed data into a map indexed by title.
  const setFeedMap = (feedArray) => {

    console.log(feedArray)
    let feedMap = {}

    feedArray.forEach(feed => {
      feedMap[feed.title] = feed
    })

    console.log(feedMap)
    setFeed(feedMap)

  }

  const clicked = (feedId) => {

    // Is the feed there (it really should be)
    const selectedFeed = feed[feedId];
    if (!selectedFeed) {
      setFeedItems([`Error: feed ${feedId} not found?!?!`])
      return
    }
    if (!selectedFeed.items || selectedFeed.items.length === 0) {
      setFeedItems([`Error: feed ${feedId} has no items?!?!`])
      return
    }
    setFeedItems(selectedFeed.items)
    
  }

  useEffect( () => {  

    (async () => {
      try {
        let response = await axios.get('http://localhost:5000/rssTest' );
        setFeedMap([response.data])
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
              clicked = { clicked }
              feedInfo = {Object.keys(feed)}
            />

            <TitlesBoxB 
              label="TitlesBoxB"
              feedInfo={ feedItems }
            />    
            
         
        </div>

    </>
  );
}

export default App;
