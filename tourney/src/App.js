import Home from './Pages/Home.tsx';
import About from './Pages/About.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import Dashboard from './Pages/Dashboard.tsx';
import Profile from './Pages/Profile.tsx';
import TourneyCreationPage from './Pages/TourneyCreationPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/Create" component={TourneyCreationPage} />
      </Switch>
    </BrowserRouter>
  );
}
