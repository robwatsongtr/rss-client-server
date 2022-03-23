import React, { useState, useEffect } from 'react';
import FeedsBoxA from './components/FeedsBoxA';
import TitlesBoxB from './components/TitlesBoxB';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';


function App() {

  const [feed, setFeed] = useState({})

  const [feedItems, setFeedItems] = useState([])

  useEffect( () => {  

    (async () => {
      try {
        let response = await axios.get('http://localhost:5000/rssTest' );
        console.log(response)
        setFeedMap([response.data])
      } catch (error) {
        console.error(error)
      }
    })();
  
  },[])


  // Utility function to turn an array of feed data into a map indexed by title.
  // This function is called above right after the API response in the async function. 
  // State is updated here for the list of feeds to be displayed.  
  const setFeedMap = (feedArray) => {

    console.log('feed array:', feedArray)
    let feedMap = {}

    feedArray.forEach(feed => {
      feedMap[feed.title] = feed
    })

    console.log('feed map:', feedMap)
    setFeed(feedMap)

  }

  // this function is called when the feed name is clicked in FeedsBoxA
  // the feed id is the name of the feed itself 
  // State is updated here for the list of articles as links to be displayed.  
  const clicked = (feedId) => {

    const selectedFeed = feed[feedId];

    if (!selectedFeed) {
      setFeedItems([`Error: feed ${feedId} not found?!?!`])
      return
    }
    if (!selectedFeed.items || selectedFeed.items.length === 0) {
      setFeedItems([`Error: feed ${feedId} has no items?!?!`])
      return
    }

    // console.log(feedId)

    setFeedItems(selectedFeed.items)
    
  }

  

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
