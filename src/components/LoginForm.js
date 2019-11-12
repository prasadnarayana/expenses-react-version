import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    serverError: ""
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.userLogin = this.userLogin.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let error = name === "username" ? "usernameError" : "passwordError";

        this.setState({
            [name]: value,
            [error]: ""
        });
    }

    validate() {
        let { username, password, usernameError, passwordError } = this.state;

        if(username === "")
            usernameError = "Username should not be empty.";
        
        if(password === "")
            passwordError = "Password should not be empty";

        if(usernameError !== "" || passwordError !== "") {
            this.setState({
                usernameError,
                passwordError
            });

            return false;
        }

        return true;
    }

    userLogin() {
        const user = {
            uname: this.state.username,
            password: this.state.password
        };

        axios.post("http://localhost:5000/signin", user)
        .then(res => {
            // console.log(res);
            if(res.data.hasOwnProperty("token")) {
                localStorage.setItem("token", res.data.token);
                this.setState(initialState);
                this.props.onUserLogin();
                this.props.history.push(`/expenses`);
            } else {
                this.setState({
                    serverError: res.data.msg
                });
            }
        })
        .catch(error => console.log(error));
    }

    handleSubmit(event) {
        event.preventDefault();

        let isValid = this.validate();
        if(isValid) {
            this.userLogin();
        }
    }

    // componentDidMount() {
    //     this.props.onUserLogout();
    // }
    
    render() {
        return (
            <div className="container login-padding">
                <div className="row">
                    <div className="col-md-3 col-sm-2"></div>
                    <div className="col-md-6 col-sm-8">
                        <h2 className="text-center">Sign In</h2>

                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="username" 
                                    placeholder="Enter username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <small className="text-danger font-weight-bold">{this.state.usernameError}</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Enter password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <small className="text-danger font-weight-bold">{this.state.passwordError}</small>
                            </div>
                            
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>

                            <p className="text-center text-danger font-weight-bold mt-2">{this.state.serverError}</p>
                        </form>
                    </div>
                    <div className="col-md-3 col-sm-2"></div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
