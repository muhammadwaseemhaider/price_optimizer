import React, { useState, useContext } from 'react';
import { TransactionContext } from '../TransactionState';

export const AddTransaction = () => {

const [description, setDescription] = useState('');
const  [transactionAmount, setTransactionAmount] = useState(0);

const { addTransaction } = useContext(TransactionContext);

const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
        id: new Date().getTime(),
        description,
        transactionAmount: +transactionAmount
    }

    addTransaction(newTransaction);
}

return (
<div>
    <h3>Add Transaction</h3>
    <form onSubmit={onSubmit} >
        <div className="form-control">
            <label htmlFor="description">
                Description
            </label>
            <input  type="text"
                    id="description"
                    placeholder="Detail of Transaction"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}>
            </input>
        </div>
        <div className="form-control">
            <label htmlFor="transactionamount">
                Transaction Amount
            </label>
            <input  type="text"
                    id="transactionamount"
                    placeholder="Enter transaction amount"
                    value={transactionAmount}
                    onChange={(e)=> setTransactionAmount(e.target.value)}>
            </input>
        </div>
        <button className="btn" >
            Add Transaction
        </button>            
    </form>
</div>
);
}
