import logo from './logo.svg';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
  NavLink,
    Redirect
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Curso from './components/Curso';

const App = () => {
  
  return (
    <Router>
      <div>
      <Switch>
        <Route path="/home" component={ Home }/>
        <Route path= "/curso/:id" component={ Curso }/>
        <Route path="/*" component={ Home }/>
      </Switch>
      </div>
    </Router>
  )
  
}

//<Route path="/home" component={Home}/>
//<Route path="curso/:id" component={Curso}/>

//<Switch>
//<Home path="/home"/>
//<Curso path= "/curso/:id" component={Curso} />
//</Switch>

//<Curso path="/curso/:id" />

export default App;
