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
        <Route path="/content/:path?" component={DirList} />
        <Redirect path="/" to="/content" />
      </Switch>
    </Router>
  );
}

export default App;
