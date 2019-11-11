import React, { Component } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import ExpenseRow from './ExpenseRow';

class Expenses extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            expensesList: []
        }

        this.getAllExpensesList = this.getAllExpensesList.bind(this);
    }

    getAllExpensesList() {
        var config = {
            headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
        };
        
        axios.get("http://localhost:5000/getAllExpenses", config)
        .then((res) => {
            this.setState({
                expensesList: res.data
            });
        })
        .catch(error => console.log(error));
    }

    componentDidMount(){
        if(!this.props.isUserLoggedIn)
            this.props.history.push("/");
        else
            this.getAllExpensesList();
    }

    render() {
        return (
            <div className="container py-5">
                <div>
                    <Link
                        to="/addExpense"
                        className="text-primary">
                            Add Expense
                    </Link>
                </div>
                <div className="table-responsive mt-5">
                    <table className="table">
                        <thead className="thead-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Taks</th>
                                <th scope="col">Amout</th>
                                <th scope="col">Date</th>
                                <th scope="col">Comments</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.expensesList.map((expense, index) => 
                                    <ExpenseRow
                                        key={expense.id}
                                        index={index}
                                        expense={expense}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Expenses
