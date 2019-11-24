import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// This component is used to display the table row with expense object details. The table will be displayed in Expenses component with the all expense details in the database.

export class ExpenseRow extends Component {
    render() {
        const { expense, index } = this.props;

        return (
            <tr>
                <th scope="row">{ index + 1}</th>
                <td>{expense.task}</td>
                <td>{expense.amount}</td>
                <td>{expense.date.split("T")[0]}</td>
                <td>{expense.comment}</td>
                <td>
                    {/* Edit font awsome Icon */}
                    <FontAwesomeIcon 
                        icon={faPencilAlt}
                        size="1x"
                        className="text-primary cursor-hover-icon"
                        onClick={() => this.props.handleExpenseEdit(expense.id)}
                    />
                </td>
                <td>
                    {/* Delete font awsome Icon */}
                    <FontAwesomeIcon 
                        icon={faTrashAlt}
                        size="1x"
                        className="text-danger cursor-hover-icon"
                        onClick={() => this.props.handleExpenseDelete(expense.id)}
                    />
                </td>
            </tr>
        )
    }
}

export default ExpenseRow;
