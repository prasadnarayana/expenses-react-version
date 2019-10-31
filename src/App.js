import React from 'react';
import './App.css';

// Router Module
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import LoginForm from './components/LoginForm';
import Expenses from './components/Expenses';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/expenses" component={Expenses} />
          <Route path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
