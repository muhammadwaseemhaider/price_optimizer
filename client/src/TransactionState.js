import React, { createContext, useReducer } from 'react'
import TransactionReducer from './TransactionReducer'
import axios from 'axios';

// Create the initial state

/* const initialState = {
    transactions: [
        {id:1, description: "Income 1", transactionAmount: 1000},
        {id:2, description: "Expense 1", transactionAmount: -100},
        {id:3, description: "Income 2", transactionAmount: 2000},
        {id:4, description: "Expense 2", transactionAmount: -500}
    ]
}
*/

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create the transaction context

export const TransactionContext = createContext(initialState)

// Create a provider for the Transaction Context

export const TransactionProvider = ({children}) => {

    const [state, dispatch] = useReducer(TransactionReducer, initialState);

    // Actions for transactions
    async function getTransactions() {
        try {
            const res = await axios.get('api/v1/transactions');

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function delTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type:'DELETE_TRANSACTION',
                payload:id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });     
        }        
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);

            dispatch({
                type:'ADD_TRANSACTION',
                payload:res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });     
        }  
    }

    return (
        <TransactionContext.Provider value={
            {
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                getTransactions,
                delTransaction,
                addTransaction
            }
        }>
            {children}
        </TransactionContext.Provider>
    )
}