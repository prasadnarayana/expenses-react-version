import React, { Component } from 'react';

class Expenses extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            msg: ""
        }
    }

    componentDidMount(){
        console.log(this.props.isUserLoggedIn);
        if(!this.props.isUserLoggedIn)
            this.props.history.push("/");
        else
            this.setState({ msg: "Expenses Dashboard" });
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.msg}</h1>
            </div>
        )
    }
}

export default Expenses
