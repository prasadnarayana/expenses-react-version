import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export class ExpenseRow extends Component {
    render() {
        const { expense, index } = this.props;
        return (
            <tr>
                <th scope="row">{ index + 1}</th>
                <td>{expense.task}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
                <td>{expense.comment}</td>
                <td>
                    <FontAwesomeIcon 
                        icon={faPencilAlt}
                        size="1x"
                        className="text-primary"
                        onClick={() => this.props.handleExpenseEdit(expense.id)}
                    />
                </td>
                <td>
                    <FontAwesomeIcon 
                        icon={faTrashAlt}
                        size="1x"
                        className="text-danger"
                    />
                </td>
            </tr>
        )
    }
}

export default ExpenseRow;
