import React, { useState } from 'react';
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

const mainLinks = [['img/', '#'], ['vids/', '/vids'], ['snd/', '/snd'], ['url+', '/url'], ['info/', '/info']];
const imgLinks = [['papier thermique #0/', '0'], ['pa. th. 1/', '1'], ['pa. th. 2/', '2'], ['random/', '#']];
const randomLinks = [['photos/', '3'], ['crbn', '4']];

const Links = () => {
  const [activeLinks, setActiveLinks] = useState({ img: false, random: false });
  return (
    <div className="links">
      <nav className="header">
        <ul className="links--main" >
          { mainLinks.map((element) => <li className="links--main--li" key={ element[0] }>
            <Link to={ element[1] }
              onClick={() => element[0] === 'img/' ?
                setActiveLinks({ ...activeLinks, img: !activeLinks.img,  random: false })
              : setActiveLinks({ ...activeLinks, img: false, random: false }) }>
                { element[0] }</Link></li>) }
        </ul>
      </nav>
      { activeLinks.img ?
        <nav className="header">
          <ul className="links--img">
            <span className="links--img--padding" style={{ visibility: 'hidden' }}>{ window.innerWidth < 640 ? "t" : null }</span>
            { imgLinks.map((element) => <li className="links--img--li" key={element[1]}>
              <Link to={ element[1] }
                onClick={() => element[0] === 'random/' ?
                  setActiveLinks({ ...activeLinks, random: !activeLinks.random }) : null }>
                  { element[0] }</Link></li>) }
          </ul>
        </nav>
        : false }
        { activeLinks.random ?
        <nav className="header">
          <ul className="links--random">
            <span className="links--random--padding" style={{ visibility: 'hidden' }}>{ window.innerWidth < 640 ? "PaddingPadd" : "PaddingPaddingPaddingPaddingPaddingPaddingP" }</span>
            {/* padding */}
            {randomLinks.map((element) => <li className="links--img--li" key={element[1]}><Link to={`/img/${element[1]}`}>{element[0]}</Link></li>)}
          </ul>
        </nav>
        : false }
    </div>
  );
}

if (window.innerWidth < 640) {
  imgLinks[0][0] = '#0';
  imgLinks[1][0] = '#1';
  imgLinks[2][0] = '#2';
  imgLinks[3][0] = 'random/';
}

function App() {
  return (
    <Router>
      <div className="App">
        <Links />
        <Switch>
          <Route path="/img/:id" render={(props) => <Img {...props} isAuthed={true} />} />
          <Route path="/info"><Info /></Route>
          <Route path="/vids"><Vids /></Route>
          <Route path='/snd' component={ () => { window.location.href = 'https://soundcloud.com/prothese'; return null; } }/>
          <Route path='/url' component={ () => { window.location.href = 'https://aiglemangeurdesinges.tumblr.com/'; return null; } }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;