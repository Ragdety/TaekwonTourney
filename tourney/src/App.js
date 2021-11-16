import Home from './Pages/Home.tsx';
import About from './Pages/About.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import Dashboard from './Pages/Dashboard.tsx';
import Profile from './Pages/Profile.tsx';
import TourneyCreationPage from './Pages/TourneyCreationPage';
import EventCreationPage from './Pages/EventCreationPage';
import LoggedInAboutPage from './Pages/LoggedInAboutPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TourneyEditPage from "./Pages/TourneyEditPage";
import Logout from "./Pages/Logout";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Logout" component={Logout} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/Create" component={TourneyCreationPage} />
        <Route exact path="/EditTournament/:tournamentId" component={TourneyEditPage} />
        <Route exact path="/EventCreationPage" component={EventCreationPage} />
        <Route exact path="/LoggedInAboutPage" component={LoggedInAboutPage} />
      </Switch>
    </BrowserRouter>
  );
}
