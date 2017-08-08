import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Home from "./Home";
import Contacts from "./Contacts";
import EditContact from "./EditContact";
import AddContact from "./AddContact";

class App extends Component {
  render() {
    return (
      <Router>
          <div className = "container">
              <Link to="/">Home</Link>
              <Link to="/contacts">Contacts</Link>

              <Route exact path="/" component={Home}/>
              <Route exact path="/contacts" component={Contacts}/>
              <Route exact path="/contacts/edit/:id" component={EditContact}/>
              <Route exact path="/contacts/add" component={AddContact}/>
          </div>
      </Router>
    );
  }
}

export default App;
