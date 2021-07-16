import './styles/App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import DirList from './components/DirList';
require('dotenv').config();

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Switch>
        <Route
        path="/content/:path?"
        render={(props) => <DirList key={props.match.params.path} {...props} />}
        />
        <Redirect exact path="/" to="/content" />
      </Switch>
    </Router>
  );
}

export default App;
