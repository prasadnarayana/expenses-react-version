import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExpenseRow from './ExpenseRow';

const config = {
    headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
};

class Expenses extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            expensesList: []
        }

        this.getAllExpensesList = this.getAllExpensesList.bind(this);
        this.handleExpenseEdit = this.handleExpenseEdit.bind(this);
        this.handleExpenseDelete = this.handleExpenseDelete.bind(this);
    }

    // Function to get all the expenses list in the database.
    getAllExpensesList() {
        axios.get("http://localhost:5000/getAllExpenses", config)
        .then((res) => {
            this.setState({
                expensesList: res.data
            });
        })
        .catch(error => console.log(error));
    }

    // Function to edit existing expense data.
    handleExpenseEdit(id) {
        // To update the expeseId field in APP component state with the expense id, that we want to edit
        this.props.updateExpenseId(id);

        // To redirect to the AddExpense component by passing id of the expense, that we want to edit as prop.
        this.props.history.push("/addexpense");
    }

    // Function to delete the expense
    handleExpenseDelete(id) {
        axios.delete(`http://localhost:5000/deleteExpense/${id}`, config)
        .then((res) => {
            if(res.data.deleted)
                this.getAllExpensesList();
        })
        .catch(error => console.log(error));
    }

    componentDidMount(){
        // Based on user logged in state, redirecting the user to either expenses component or login component
        if(this.props.isUserLoggedIn){
            this.getAllExpensesList();
            this.props.updateExpenseId("");
        }
        else
            this.props.history.push("/");
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
                                        handleExpenseEdit={this.handleExpenseEdit}
                                        handleExpenseDelete={this.handleExpenseDelete}
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

export default Expenses;
