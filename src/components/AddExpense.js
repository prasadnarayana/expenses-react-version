import React, { Component } from 'react';

export class AddExpense extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            id: "",
            task: "",
            amount: "",
            date: new Date().toString(),
            comment: ""     
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }
    
    render() {
        const { id, task, amount, date, comment } = this.state;

        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
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
                                <label htmlFor="task">Task</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="task" 
                                    placeholder="Enter task to which you spent money"
                                    name="task" 
                                    required
                                    value={task}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="amount" 
                                    placeholder="Enter amount you spent"
                                    name="amount"
                                    required
                                    value={amount}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Select Date</label>
                                <input 
                                    type="date"
                                    id="dt"
                                    max="3000-12-31" 
                                    min="1000-01-01"
                                    className="form-control"
                                    name="date"
                                    required
                                    value={date}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment">Comment</label>
                                <textarea 
                                    className="form-control"
                                    id="comment" rows="3" 
                                    placeholder="Comments about expense"
                                    name="comment"
                                    required
                                    max="50"
                                    value={comment}
                                    onChange={this.handleChange}
                                ></textarea>
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
