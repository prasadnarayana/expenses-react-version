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

// function App() {
//   return (
//     <div>
//       <Router>
//         <Header />
//         <Switch>
//           <Route exact path="/" component={LoginForm} />
//           <Route path="/expenses" component={Expenses} />
//           <Route path="/contact" component={Contact} />
//         </Switch>
//         <Footer />
//       </Router>
//     </div>
//   );
// }

export class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isUserLoggedIn: localStorage.getItem("token") ? true : false
    };

    this.onUserLogin = this.onUserLogin.bind(this);
    this.onUserLogout = this.onUserLogout.bind(this);
  }

  onUserLogin() {
    this.setState({
      isUserLoggedIn: true
    });
  }

  onUserLogout() {
    localStorage.clear();

    this.setState({
      isUserLoggedIn: false
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
                />
              } 
            />
            <Route 
              path="/addexpense" 
              render={ (props) =>
                <AddExpense 
                  {...props}
                  isUserLoggedIn={this.state.isUserLoggedIn}
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
