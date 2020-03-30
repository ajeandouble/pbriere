import React from 'react';
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

const mainLinks = [['img/', '/img/0'], ['vids/', '/vids'], ['snd/', '/snd'], ['url+', '/url'], ['info', '/info']];

const Links = () => (
  <nav className="header" id={ window.location.pathname === '/' ? 'links--main__black' : '' }>
    <ul className="links--main" >
      {mainLinks.map((element) => <li className="links--main--li" key={element[0]}><Link to={element[1]}>{element[0]}</Link></li>)}
    </ul>
  </nav>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Links />
        <Switch>
          <Route exact path="/" component={Bjr} />
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