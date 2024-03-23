import BanList from './components/BanList'
import './App.css'
import { useState } from 'react'
import DiscoverRes from './components/DiscoverRes';

function App() {
  const ACCESS_KEY = import.meta.env.API_KEY;

  const [bannedAttrs, setBannedAttrs] = useState([]);
  const [apiImg, setApiImg] = useState({
    imgSrc: '',
    title: '',
    keywords: [],
  });

  const handleRemoveBan = (e) => {
    const attrToRemove = e.target.value;
    const attrIndex = bannedAttrs.indexOf(attrToRemove);
    // create a new banned attr array without the attribute to remove
    setBannedAttrs([...bannedAttrs.slice(0, attrIndex), ...bannedAttrs.slice(attrIndex + 1)]);

  }

  // add a new attribute to the banned list
  const handleBan = (e) => {
    console.log(`ban: ${e.target.innerText}`)
    setBannedAttrs([...bannedAttrs, e.target.innerText]);
  }

  // get an img from the NASA api
  const fetchImg = async () => {
    const response = await fetch("https://images-api.nasa.gov/search?media_type=image");
    const json = await response.json();

    // make sure an image was fetched
    if (json === null) alert("Image not generated");
    else { // return a random img from the list returned
      const imgsList = json.collection.items;
      // console.log(imgsList);
      return imgsList[getRandomInt(imgsList.length)];
    }
  }

  // Helper function to get a random integer up to (but not including) the maximum.
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const handleDiscover = async () => {
    let imgJson = await fetchImg();
    let imgKeywords = imgJson.data[0].keywords;
    
    // regenerate the img if it has a banned keyword
    while(inBanList(imgKeywords) || imgKeywords == undefined || imgKeywords == null) {
      imgJson = await fetchImg();
      imgKeywords = imgJson.data[0].keywords;
    }

    setApiImg({
      imgSrc: imgJson.links[0].href,
      title: imgJson.data[0].title,
      keywords: [...imgKeywords]
    });
    // check to make sure none of the keywords are banned words
    // for (img)
  }

  const inBanList = (keywords) => {

  }

  return (
    <>
      <div className="venci-container">
        <h1 className="title">Veni Vici!</h1>
        <p className="subtitle">Discover amazing pictures taken by NASA 🚀</p>

        {/* Container for the Veni Vici Results! */}
        {apiImg ? <DiscoverRes
            img={apiImg.imgSrc}
            title={apiImg.title}
            keywords={apiImg.keywords}
            handleBtnClick={(e) => handleBan(e)} 
          />
        : null}

        <button 
          className="btn"
          onClick={handleDiscover}>Discover 🔎</button>
      </div>
       
      <BanList 
        bannedAttribues={bannedAttrs}
        handleRemoveBan={(e) => handleRemoveBan(e)}/>
    </>
  )
}

export default App
