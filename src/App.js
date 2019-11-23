import React, { Component } from 'react';
import './App.css';

// Router Module
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import LoginForm from './components/LoginForm';
import Expenses from './components/Expenses';
import AddExpense from './components/AddExpense';

export class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      //This property is used to check weather the user is logged in or not based on the token set in localStorage. Only authenticated users will be given access to the expenses page.
      isUserLoggedIn: localStorage.getItem("token") ? true : false,

      // This property will be passed to the AddExpense component which is used to add new expense details/update the existing expense details. If user clicks on edit button of an expense the correspoinding id will be set to this property using updateExpenseId method in this component, so that when we redirected to AddExpense component the form will be populated with details of an expense corresponding to the id that we passed.
      expenseId: ""
    };

    this.onUserLogin = this.onUserLogin.bind(this);
    this.onUserLogout = this.onUserLogout.bind(this);
    this.updateExpenseId = this.updateExpenseId.bind(this);
  }

  onUserLogin() {
    this.setState({
      isUserLoggedIn: true
    });
  }

  onUserLogout() {
    localStorage.clear();

    this.setState({
      isUserLoggedIn: false,
      expenseId: ""
    });
  }

  updateExpenseId(id) {
    this.setState({
      expenseId: id
    });
  }

  render() {    
    return (
      <div>
        <Router>
          <Header 
            isUserLoggedIn={this.state.isUserLoggedIn}
            onUserLogout={this.onUserLogout}
          />
          <Switch>
            <Route 
              exact 
              path="/" 
              render={ (props) => 
                <LoginForm 
                  {...props} 
                  onUserLogin={this.onUserLogin}
                  onUserLogout={this.onUserLogout}
                /> 
              } 
            />
            <Route 
              path="/expenses" 
              render={ (props) =>
                <Expenses 
                  {...props}
                  isUserLoggedIn={this.state.isUserLoggedIn}
                  updateExpenseId={this.updateExpenseId}
                />
              } 
            />
            <Route 
              path="/addexpense" 
              render={ (props) =>
                <AddExpense 
                  {...props}
                  id={this.state.expenseId}
                  updateExpenseId={this.updateExpenseId}
                />
              } 
            />
            <Route path="/contact" component={ Contact } />
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default App;
