import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
    id: "",
    task: "",
    amount: "",
    date: "",
    comment: "",
    taskError: "",
    amountError: "",
    dateError: "",
    commentError: "",
    isInserted: false,  
};

export class AddExpense extends Component {
    constructor(props) {
        super(props);
    
        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.inserExpenseData = this.inserExpenseData.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let error;

        switch(name) {
            case "task":
                error = "taskError";
                break;
            case "amount":
                error = "amountError";
                break;
            case "date":
                error = "dateError";
                break;
            case "comment":
                error = "commentError";
                break;
        }

        this.setState({
            [name]: value,
            [error]: ""
        });
    }

    validate() {
        let { task, amount, date, comment, taskError, amountError, dateError, commentError} = this.state;
        let noRegex = new RegExp("^[1-9][0-9]{1,10}$");
        console.log(noRegex.test(amount));

        if (task === "")
            taskError = "Task field should not be empty.";

        if (amount === "")
            amountError = "Amount field should not be empty";
        else if (!noRegex.test(amount))
            amountError = "Amount should contain numbers only."

        if (date === "")
            dateError = "Date field should not be empty"

        if (comment === "")
            commentError = "Comment field should not be empty"
        else if (comment.length > 50)
            commentError = "Comment should contain less than 50 characters."

        if (taskError !== "" || amountError !== "" || dateError !== "" || commentError !== "") {
            this.setState({
                taskError,
                amountError,
                dateError,
                commentError
            });

            return false;
        }

        return true;
    }

    inserExpenseData() {
        const config = {
            headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
        };

        const expense = {
            task: this.state.task,
            amount: parseInt(this.state.amount),
            date: this.state.date,
            comment: this.state.comment
        }

        axios.post("http://localhost:5000/addExpense", expense, config)
        .then(res => {
            if (res.data.inserted)
                this.setState({
                    ...initialState,
                    isInserted: true
                });
        })
        .catch(error => console.log(error));
    }

    handleSubmit(event) {
        event.preventDefault();

        let isValid = this.validate();
        if (isValid)
            this.inserExpenseData();
    }

    componentDidMount() {
        if (this.props.id !== "") {
            const config = {
                headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
            };

            axios.get(`http://localhost:5000/getSingleExpenses/${this.props.id}`, config)
            .then((res) => {
                // console.log(res.data);
                this.setState({
                    ...initialState,
                    ...res.data
                });
                console.log(this.state);
            })
            .catch(error => console.log(error));
        }
    }
    
    render() {
        const { id, task, amount, date, comment } = this.state;

        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        {this.state.isInserted &&
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>SUCCESS!</strong> Your expense details inserted successfully.
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }
                        <h2 className="display-5 text-center">Add Expense</h2>
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="hidden"
                                    name="id"
                                    value={id}
                                />
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="task"
                                    className={"col-form-label " + (this.state.taskError ? "text-danger" : "")}
                                >Task</label>
                                <input 
                                    type="text" 
                                    className={"form-control " + (this.state.taskError ? "is-invalid" : "")}
                                    id="task" 
                                    placeholder="Enter task to which you spent money"
                                    name="task" 
                                    value={task}
                                    onChange={this.handleChange}
                                />
                                <small className="text-danger d-block text-center font-weight-bold">{this.state.taskError}</small>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="amount"
                                    className={"col-form-label " + (this.state.amountError ? "text-danger" : "")}
                                >Amount</label>
                                <input 
                                    type="text"
                                    className={"form-control " + (this.state.amountError ? "is-invalid" : "")}
                                    id="amount" 
                                    placeholder="Enter amount you spent"
                                    name="amount"
                                    value={amount}
                                    onChange={this.handleChange}
                                />
                                <small className="text-danger d-block text-center font-weight-bold">{this.state.amountError}</small>
                            </div>
                            <div className="form-group">
                                <label
                                    className={"col-form-label " + (this.state.dateError ? "text-danger" : "")}
                                >Select Date</label>
                                <input 
                                    type="date"
                                    id="dt"
                                    max="3000-12-31" 
                                    min="1000-01-01"
                                    className={"form-control " + (this.state.dateError ? "is-invalid" : "")}
                                    name="date"
                                    value = {date.toString()}
                                    onChange={this.handleChange}
                                />
                                <small className="text-danger d-block text-center font-weight-bold">{this.state.dateError}</small>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="comment"
                                    className={"col-form-label " + (this.state.commentError ? "text-danger" : "")}
                                >Comment</label>
                                <textarea 
                                    className={"form-control " + (this.state.commentError ? "is-invalid" : "")}
                                    id="comment" rows="3" 
                                    placeholder="Comments about expense"
                                    name="comment"
                                    max="50"
                                    value={comment}
                                    onChange={this.handleChange}
                                ></textarea>
                                <small className="text-danger d-block text-center font-weight-bold">{this.state.commentError}</small>
                            </div>
                            <button
                             type="submit"
                             className="btn btn-primary px-5"
                            >Add</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}

export default AddExpense;
