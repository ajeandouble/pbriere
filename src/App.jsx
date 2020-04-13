import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Bjr from './components/Bjr'
import Img from './components/Img'
import Vids from './components/Vids'
import Info from './components/Info'

const mainLinks = [['img/', '#'], ['vids/', '/vids'], ['url+', '#'], ['info/', '/info']];
const imgLinks =  [['papier thermique', '#'], ['random/', '#']];
const papierLinks = [['pa. th. 0/', '/img/0'], ['pa. th. 1/', '/img/1'], ['pa. th. 2/', '/img/2']];
const randomLinks = [['photos/', '/img/3'], ['crbn', '/img/4']];
const urlLinks = [['tumblr/', 'https://aiglemangeurdesinges.tumblr.com/'], ['tumblr2/', 'https://friction-images.tumblr.com/'], ['flickr/', 'https://www.flickr.com/photos/tofusoyo/'], ['ig/', 'https://www.instagram.com/hermetikon/'], ['ig2/', 'https://www.instagram.com/visual_predation/'], ['soundcloud/', 'https://soundcloud.com/prothese']];

const Links = () => {
  const [activeLinks, setActiveLinks] = useState({ img: false, papier: false, random: false, url: false });

  const handleClick = (element) => {
    element[0] === 'img/' ?
    setActiveLinks({ ...activeLinks, papier: false, img: !activeLinks.img,  random: false, url: false })
    : setActiveLinks({ ...activeLinks, papier: false, img: false, random: false })
    element[0] === 'random/' ?
      setActiveLinks({ ...activeLinks,  papier: false, random: !activeLinks.random })
    : void(0);
    element[0] === 'papier thermique' ?
      setActiveLinks({ ...activeLinks, papier: !activeLinks.papier, random: false })
    : void(0);
    element[0] === 'random/' ?
      setActiveLinks({ ...activeLinks, papier: false, random: !activeLinks.random })
    : void(0);
    element[0] === 'url+' ?
    setActiveLinks({ ...activeLinks, papier: false, img: false, random: false, url: !activeLinks.url })
  : void(0);
    // url+
  }

  return (
    <div className="links">
      <nav className="header">
        <ul className="links--main" >
          { mainLinks.map((element) => <li className="links--main--li" key={ element[0] }>
            <Link to={ element[1] }
              onClick={ () => handleClick(element) }c>
                { element[0] }</Link></li>) }
        </ul>
      </nav>
      { activeLinks.img ?
        <nav className="header">
          <ul className="links--img">
            <span className="links--img--padding" style={{ visibility: 'hidden' }}>{ window.innerWidth < 640 ? "t" : null }</span>
            { imgLinks.map((element) => <li className="links--img--li" key={element[1]}>
              <Link to={ `${ element[1] }` }
                onClick={ () => handleClick(element) } >
                  { element[0] }</Link></li>) }
          </ul>
        </nav>
        : false }
        { activeLinks.random ?
        <nav className="header">
          <ul className="links--random">
            <span className="links--random--padding" style={{ visibility: 'hidden', marginLeft: "0.30rem" }}>{ window.innerWidth < 640 ? "PaddingPaddingPad" : "PaddingPaddingPad" }</span>
            {/* padding */}
            {randomLinks.map((element) => <li className="links--img--li" key={element[1]}><Link to={`${element[1]}`}>{element[0]}</Link></li>)}
          </ul>
        </nav>
        : false }
        { activeLinks.papier ?
        <nav className="header">
          <ul className="links--papier">
            <span className="links--random--padding" style={{ visibility: 'hidden' }}>{ window.innerWidth < 640 ? "P" : "" }</span>
            {/* padding */}
            {papierLinks.map((element) => <li className="links--img--li" key={element[1]}><Link to={`${element[1]}`}>{element[0]}</Link></li>)}
          </ul>
        </nav>
        : false }
        { activeLinks.url ?
        <nav className="header">
          <ul className="links--url">
            {/* padding */}
            {urlLinks.map((element, i) =>  <div><span className="links--url--padding" style={{ visibility: 'hidden' }}>{ window.innerWidth < 640 ? "PaddingPaddin" : "PaddingPaddingPaddingPaddin" }</span>
            <li className="links--img--li" key={element[1]}><Link to={`/url/${i}`} target="_blank">{element[0]}</Link><br /></li></div>)}
          </ul>
        </nav>
        : false }
    </div>
  );
}

function App() {
  useEffect(() => {/*
    if (window.innerWidth < 640) {
      imgLinks[0][0] = '#0';
      imgLinks[1][0] = '#1';
      imgLinks[2][0] = '#2';
      imgLinks[3][0] = 'random/';
    }*/
  });

  return (
    <Router>
      <div className="App">
        <Links />
        <Switch>
          {/* _TODO_ add Bjr component */}
          <Route exact path="/" component={Bjr} />
          <Route path="/img/:id" render={(props) => <Img {...props} isAuthed={true} />} />
          <Route path="/info"><Info /></Route>
          <Route path="/vids"><Vids /></Route>
          { urlLinks.map((url, i) => <Route path={`/url/${i}`} component={ () => { window.location.href = urlLinks[i][1]; return null; } } />) }
        </Switch>
      </div>
    </Router>
  );
}

export default App;